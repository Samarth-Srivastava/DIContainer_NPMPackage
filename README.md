
# Dil - A simple Dependency Inversion container for javascript/typescript 

Dil, in hindi/urdu literal meaning heart, is a DI container.

Register your services once and then resolve them anywhere needed.
## Usage/Examples

```javascript
// services/LoggerService.ts
export class LoggerService {
  log(message: string): void {
    // your code here
  }
}
```
Another service dependent on logger service

```javascript
// services/UserService.ts
import { LoggerService } from './LoggerService';

export class UserService {
  constructor(private logger: LoggerService) {}

  getUser() {
    this.logger.log(/* log something*/);
    // return user;
  }
}
```

Register both the services with Dil container
```javascript
// app.ts
import { container } from './DIContainer';
import { LoggerService } from './services/LoggerService';
import { UserService } from './services/UserService';

// Register services
container.register<LoggerService>('loggerService', new LoggerService());
container.register<UserService>('userService', new UserService(container.resolve<LoggerService>("loggerService")));

// Resolve the userService and use it
const userService = container.resolve<UserService>('userService');
const user = userService.getUser();
```


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/Samarth-Srivastava)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/samarthsrivastava/)

