const dev = process.env.NODE_ENV === "dev";
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const exec = require('child_process').exec;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Html-webpack-plugin configuration
const indexConfig = {
    template: './src/index.hbs',
    excludeChunks: ['electron'],
    baseHref: dev ? '/' : './',
    // chunksSortMode: (chunk1, chunk2) => {
    //     // Set the order of files injected (dependencies before app)
    //     // https://github.com/jantimon/html-webpack-plugin/issues/481
    //     let orders = ['corejs', 'zonejs', 'app'];
    //     return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0]);
    // }
};

// Clean-webpack-plugin configuration
const pathsToClean = [
    './dist/css',
    './dist/assets',
    './dist/templates'
];

let webpackConfig = {
    mode: 'none',
    // How source maps are generated : style of source mapping
    devtool: dev ? 'eval-cheap-module-source-map' : false,
    // Development server configuration
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true,
        // Execute custom middleware after all other middleware internally within the server
        after() {
            // Fix whitescreen bug on build with Electron BrowserWindow
            exec('electron . --dev');
        }
    },
    // Where webpack looks to start building the bundle
    // entry: {
    //     'electron': './electron', // Electron entry point
    //     'corejs': 'core-js/client/shim', // Angular dependency
    //     'zonejs': 'zone.js/dist/zone', // Angular dependency
    //     'app': './src/main.ts' // App entry point
    // },
    entry: {
        electron: './electron', // Electron entry point
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts',
        app: './src/main.ts', // App entry point
    },
    // How the different types of modules within a project will be treated
    module: {
        rules: [
            // {
            //     // All files with a '.ts' extension will be handled by ts-loader
            //     test: /\.ts$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            },
            {
                // All files with a '.scss' extension will be handled by sass-loader
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:10].css'
                        }
                    },
                    'extract-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: !dev
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: dev
                        }
                    },
                    'resolve-url-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // All images and fonts will be optimized and their paths will be solved
                enforce: 'pre',
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:10].[ext]',
                            limit: 8192
                        }
                    }, {
                        loader: 'img-loader'
                    }],
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: {
                    loader: 'underscore-template-loader',
                    query: {
                        attributes: ['img:src', 'link:href']
                    }
                }
            },
            // Ignore warnings about System.import in Angular
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: {
                    system: true
                }
            }
        ]
    },
    // Configure how modules are resolved
    resolve: {
        extensions: [".ts", ".js", '.scss']
    },
    // How and where webpack should output bundles, assets and anything else
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    // What bundle information gets displayed
    stats: {
        warnings: false
    },
    // Target a specific environment (cf. doc)
    target: 'electron-renderer',
    // Configure whether to polyfill or mock certain Node.js globals and modules
    node: {
        __dirname: false
    },
    // Customize the webpack build process with additionals plugins
    plugins: [
        new HtmlWebpackPlugin(indexConfig),
        // new Webpack.ContextReplacementPlugin(/angular([\\\/])core([\\\/])/, path.resolve(__dirname, './src')),
        new CopyWebpackPlugin(['./package.json']),
        new Webpack.NamedModulesPlugin(),
    ],
};

// UglifyJs and clean output folder only for prod
if (!dev) {
    webpackConfig.plugins.push(new CleanWebpackPlugin(pathsToClean));
    webpackConfig.plugins.push(new UglifyJsPlugin());
}

// Export the config
module.exports = webpackConfig;
