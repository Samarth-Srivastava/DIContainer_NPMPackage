"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
class Container {
    constructor() {
        this.services = new Map();
    }
    // registerOld<T>(token: string, ObjectOfClassT: T) {
    //   this.services.set(token, ObjectOfClassT);
    // }
    register(token, nameOfClassT, dependencies = []) {
        this.services.set(token, { nameOfClassT, dependencies, isSingleton: false });
    }
    registerTransient(token, nameOfClassT, dependencies = []) {
        this.services.set(token, { nameOfClassT, dependencies, isSingleton: false });
    }
    registerSingleton(token, nameOfClassT, dependencies = []) {
        this.services.set(token, { nameOfClassT, dependencies, isSingleton: true });
    }
    resolve(token) {
        const registered_Object = this.services.get(token);
        if (!registered_Object) {
            throw new Error(`Service not found: ${token}`);
        }
        if (registered_Object.instanceOfClassT) {
            return registered_Object.instanceOfClassT;
        }
        const { nameOfClassT, dependencies, isSingleton } = registered_Object;
        const injections = dependencies.map(dep => this.resolve(dep));
        const ObjectOfClassT = new nameOfClassT(...injections);
        if (isSingleton) {
            registered_Object.instanceOfClassT = ObjectOfClassT;
        }
        return ObjectOfClassT;
    }
}
exports.container = new Container();
