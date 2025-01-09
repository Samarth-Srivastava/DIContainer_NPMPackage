"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dependency1 {
    constructor() {
        console.log("Dependency 1 called \r\n");
    }
    func1() {
        console.log("called func1");
    }
}
class Dependency2 {
    constructor(dep3) {
        this.dep3 = dep3;
        console.log("Dependency 2 called \r\n");
        this.dep33 = dep3;
    }
    func2() {
        var _a;
        console.log("called func2");
        (_a = this.dep33) === null || _a === void 0 ? void 0 : _a.func3();
    }
}
class Dependency3 {
    constructor() {
        console.log("Dependency 3 called \r\n");
    }
    func3() {
        console.log("called func3");
    }
}
class Dependency4 {
    constructor(dep1, dep2) {
        this.dep1 = dep1;
        this.dep2 = dep2;
        console.log("Dependency  4 called \r\n");
    }
    func4() {
        console.log("called func4");
    }
}
const dil_1 = require("@samarth-srivastava/dil");
dil_1.container.register("dep1", Dependency1);
const d1 = dil_1.container.resolve("dep1");
d1.func1();
dil_1.container.registerSingleton("dep3", Dependency3);
const d3 = dil_1.container.resolve("dep3");
d3.func3();
dil_1.container.register("dep2", Dependency2, ["dep3"]);
const d2 = dil_1.container.resolve("dep2");
d2.func2();
dil_1.container.register("dep4", Dependency4);
const d4 = dil_1.container.resolve("dep4");
d4.func4();
//# sourceMappingURL=test1.js.map