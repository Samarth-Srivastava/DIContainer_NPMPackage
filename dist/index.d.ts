type Constructor<T> = {
    new (...args: any[]): T;
};
declare class Container {
    constructor();
    private services;
    register<T>(token: string, nameOfClassT: Constructor<T>, dependencies?: string[]): void;
    registerTransient<T>(token: string, nameOfClassT: Constructor<T>, dependencies?: string[]): void;
    registerSingleton<T>(token: string, nameOfClassT: Constructor<T>, dependencies?: string[]): void;
    resolve<T>(token: string): T;
}
export declare const container: Container;
export {};
