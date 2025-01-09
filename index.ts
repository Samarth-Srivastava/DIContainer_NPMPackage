type Constructor<T> = { new (...args: any[]): T };

class Container {
  constructor() {}
  private services = new Map<string, { nameOfClassT: Constructor<any>, dependencies: string[], isSingleton: boolean, instanceOfClassT?: any}>();

  // registerOld<T>(token: string, ObjectOfClassT: T) {
  //   this.services.set(token, ObjectOfClassT);
  // }

  register<T>(token: string, nameOfClassT: Constructor<T>, dependencies: string[] = []): void {
    this.services.set(token, { nameOfClassT, dependencies, isSingleton: false });
  }

  registerTransient<T>(token: string, nameOfClassT: Constructor<T>, dependencies: string[] = []): void {
    this.services.set(token, { nameOfClassT, dependencies, isSingleton: false });
  }

  registerSingleton<T>(token: string, nameOfClassT: Constructor<T>, dependencies: string[] = []): void {
    this.services.set(token, { nameOfClassT, dependencies, isSingleton: true });
  }

  resolve<T>(token: string): T {
    const registered_Object = this.services.get(token);

    if (!registered_Object) {
      throw new Error(`Service not found: ${token}`);
    }

    if(registered_Object.instanceOfClassT){
      return registered_Object.instanceOfClassT;
    }

    const { nameOfClassT, dependencies, isSingleton } = registered_Object;
    const injections = dependencies.map(dep => this.resolve(dep));
    
    const ObjectOfClassT = new nameOfClassT(...injections);

    if(isSingleton){
      registered_Object.instanceOfClassT = ObjectOfClassT;
    }

    return ObjectOfClassT;
  }
}

export const container = new Container();
