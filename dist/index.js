"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
class Container {
    constructor() {
        this.services = new Map();
    }
    register(token, ObjectOfClassT) {
        this.services.set(token, ObjectOfClassT);
    }
    resolve(token) {
        const obj = this.services.get(token);
        if (!obj) {
            throw new Error(`Service not found: ${token}`);
        }
        return obj;
    }
}
exports.container = new Container();
//# sourceMappingURL=index.js.map