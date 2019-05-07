let lastId = 0

export class IdGenerator {
    static generateId() {
        return lastId++;
    }
}
