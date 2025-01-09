class Dependency1{
    constructor(){
        console.log("Dependency 1 called \r\n");
    }

    public func1(){
        console.log("called func1");
    }
}

class Dependency2{
    dep33: Dependency3 | undefined;
    constructor(private dep3: Dependency3){
        console.log("Dependency 2 called \r\n");   
        this.dep33 = dep3;
    }
    
    public func2(){
        console.log("called func2");
        this.dep33?.func3();
    }
}

class Dependency3{
    constructor(){
        console.log("Dependency 3 called \r\n");
    }

    public func3(){
        console.log("called func3");
    }
}

class Dependency4{
    constructor(private dep1: Dependency1, private dep2: Dependency2) {
        console.log("Dependency  4 called \r\n");
    }
    
    public func4(){
        console.log("called func4");
    }
}

import {container} from '@samarth-srivastava/dil';

container.register<Dependency1>("dep1", Dependency1);
const d1 = container.resolve<Dependency1>("dep1");
d1.func1();

container.registerSingleton("dep3", Dependency3);
const d3 = container.resolve<Dependency3>("dep3");
d3.func3();

container.register("dep2", Dependency2, ["dep3"]);
const d2 = container.resolve<Dependency2>("dep2");
d2.func2();

container.register("dep4", Dependency4);
const d4 = container.resolve<Dependency4>("dep4");
d4.func4();
