# Dil: Your Heartfelt Dependency Injection Container for TypeScript & JavaScript

[](https://www.npmjs.com/package/@samarth-srivastava/dil)
[](https://opensource.org/licenses/MIT)
[](https://github.com/Samarth-Srivastava)
[](https://www.linkedin.com/in/samarthsrivastava/)

**Dil**, literally meaning "heart" in Hindi/Urdu, is a simple, intuitive, and lightweight **Dependency Injection (DI)** container designed to bring **testability**, **maintainability**, and **scalability** to your TypeScript and JavaScript applications.

Say goodbye to manual dependency management and tight coupling. With Dil, you register your services once, and the container handles resolving and injecting them wherever they're needed. This empowers you to build modular, loosely coupled codebases that are a joy to work with and easy to test.

-----

## ✨ Why Dil?

  * **Simplicity at its Core:** A minimal API that's easy to learn and integrate into any project.
  * **Boosts Testability:** Easily swap out dependencies with mocks or stubs for isolated unit testing.
  * **Promotes Loose Coupling:** Decouple your components, making your codebase more flexible and easier to refactor.
  * **Manages Lifecycles:** Supports both **transient** (new instance every time) and **singleton** (single shared instance) services.
  * **TypeScript-First:** Built with TypeScript for excellent type inference and a smooth developer experience.

-----

## 🚀 Installation

Getting started with Dil is straightforward:

```bash
npm install @samarth-srivastava/dil
# or
yarn add @samarth-srivastava/dil
```

-----

## 📖 Usage & Examples

Dil's API is designed for clarity. You **register** your services with the container and then **resolve** them when you need an instance.

### Core Methods

| Method                        | Parameters                                                                                                                              | Description                                                                                                                                                                                                                                                                                                                                     |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `register<T>(key, Class, dependencies?)`     | `key` (`string`, **required**): A unique string identifier for the service.\<br\>`Class` (`T`, **required**): The constructor function of the class to register.\<br\>`dependencies` (`string[]`, *optional*): An array of string keys representing the dependencies this class needs, in the **exact order** of its constructor parameters. | Registers a service as **transient**. A new instance of `Class` will be created and returned every time it's resolved. If `dependencies` are provided, Dil will resolve these first and pass them to `Class`'s constructor in the specified order.                                                                                             |
| `registerTransient<T>(key, Class, dependencies?)` | Same as `register<T>`                                                                                                                   | Explicitly registers a service as **transient**. (Identical behavior to `register<T>`).                                                                                                                                                                                                                                                         |
| `registerSingleton<T>(key, Class, dependencies?)` | Same as `register<T>`                                                                                                                   | Registers a service as a **singleton**. The `Class` will be instantiated only **once** the first time it's resolved. Subsequent resolutions will return the same instance. Dependencies are resolved and passed to the constructor as with transient services.                                                                                    |
| `resolve<T>(key)`             | `key` (`string`, **required**): The unique string identifier of the registered service you wish to resolve.                             | Resolves and returns an instance of the registered service. If the service has dependencies, Dil will automatically resolve and inject them into its constructor. Returns the appropriate lifecycle instance (new for transient, existing for singleton).                                                                                           |

### Example Walkthrough

Let's illustrate how to use Dil with a common scenario: logging and user management.

```typescript
// services/LoggerService.ts
export class LoggerService {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}
```

Now, a service that depends on our `LoggerService`:

```typescript
// services/UserService.ts
import { LoggerService } from './LoggerService';

export class UserService {
  // Dil expects constructor parameters to match the order of declared dependencies
  constructor(private logger: LoggerService) {}

  getUserById(id: string) {
    this.logger.log(`Attempting to fetch user with ID: ${id}`);
    // ... actual logic to fetch user
    return { id: id, name: "Dil User" }; // Dummy data
  }
}
```

And another service using the same logger:

```typescript
// services/EmployeeService.ts
import { LoggerService } from './LoggerService';

export class EmployeeService {
  constructor(private logger: LoggerService) {}

  getEmployeeById(id: string) {
    this.logger.log(`Attempting to fetch employee with ID: ${id}`);
    // ... actual logic to fetch employee
    return { id: id, name: "Dil Employee" }; // Dummy data
  }
}
```

Finally, register and resolve your services using the `container`:

```typescript
// app.ts (Your application's entry point)
import { container } from '@samarth-srivastava/dil';
import { LoggerService } from './services/LoggerService';
import { UserService } from './services/UserService';
import { EmployeeService } from './services/EmployeeService';

// --- Registering Services with Dil ---

// Register LoggerService as a Singleton.
// It doesn't have any dependencies, so the 'dependencies' array is omitted.
container.registerSingleton<LoggerService>('loggerService', LoggerService);

// Register UserService as Transient.
// It depends on 'loggerService', so we pass its key in the dependencies array.
// The order here MUST match the constructor parameter order in UserService.
container.register<UserService>('userService', UserService, ["loggerService"]);

// Register EmployeeService as Transient.
// It also depends on 'loggerService'.
container.register<EmployeeService>('empService', EmployeeService, ["loggerService"]);


// --- Resolving and Using Services ---

console.log("--- Resolving UserService ---");
const userService = container.resolve<UserService>('userService');
const user = userService.getUserById("123");
console.log("User:", user);

console.log("\n--- Resolving EmployeeService ---");
const employeeService = container.resolve<EmployeeService>('empService');
const employee = employeeService.getEmployeeById("A789");
console.log("Employee:", employee);

// Since LoggerService is a singleton, both userService and employeeService
// will receive the *same instance* of LoggerService.
const anotherUserService = container.resolve<UserService>('userService');
console.log("\nAre logger instances the same?", userService['logger'] === anotherUserService['logger']); // true
```

-----

## 🛣️ Future Enhancements

We're continuously working to make Dil even more powerful and developer-friendly. Future plans include:

  * **Decorator-based Dependency Resolution:** For a more concise and type-safe way to define dependencies directly on your classes (e.g., `@injectable()`, `@inject('ILogger')`).
  * **Asynchronous Service Resolution:** Support for services that require async initialization.
  * **Improved Error Diagnostics:** Clearer messages for common issues like missing dependencies or circular dependencies.

-----

## 🤝 Contributing

We welcome contributions\! If you have suggestions, bug reports, or want to contribute code, please feel free to open an issue or submit a pull request on our [GitHub repository](https://github.com/Samarth-Srivastava/DIContainer_NPMPackage).

-----
