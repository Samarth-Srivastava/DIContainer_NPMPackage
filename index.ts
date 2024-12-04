class Container {
  constructor() {}
  private services = new Map<string, any>();

  register<T>(token: string, ObjectOfClassT: T) {
    this.services.set(token, ObjectOfClassT);
  }

  resolve<T>(token: string): T {
    const obj = this.services.get(token);

    if (!obj) {
      throw new Error(`Service not found: ${token}`);
    }

    return obj;
  }
}

export const container = new Container();
