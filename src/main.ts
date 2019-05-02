import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { hmrModule } from '@angularclass/hmr';

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (true) {
    if (module['hot']) {
        // hmrBootstrap(module, bootstrap);
        bootstrap().then((ngModuleRef) => {
            return hmrModule(ngModuleRef, module);
        }).catch(err => console.log(err));
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else {
    // bootstrap().catch(err => console.log(err));
}
// declare let module: any
// module.hot.accept();
// platformBrowserDynamic().bootstrapModule(AppModule);
