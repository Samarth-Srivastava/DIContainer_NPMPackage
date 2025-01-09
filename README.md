
# Dil - A simple Dependency Inversion container for javascript/typescript 

Dil, in hindi/urdu literal meaning heart, is a DI container.

Register your services once and then resolve them anywhere needed.


| Methods           |Parameters                                           | Description              |
| ----------------- |---------|:------------------------------------:|
| register\<T>          |key : `required` - `string` - Key for the class being registered<br>T : `required` - `custom type` - Name of the class<br>dependency : `optional` - `string array` - registered keys of dependency classes, if any         | registers service/class as transient |
| registerTransient\<T> |Same As Above         | registers service/class as transient |
| registerSingleton\<T> |Same As Above     | registers service/class as singleton | 
| resolve\<T> |key : `required` - `string` - Key for the class being registered        | resolves service/class  when needed | 


## Usage/Examples

```javascript
// services/LoggerService.ts
export class LoggerService {
  log(message: string): void {
    // your code here
  }
}
```
Another services dependent on logger service

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

```javascript
// services/EmployeeService.ts
import { LoggerService } from './LoggerService';

export class EmployeeService {
  constructor(private logger: LoggerService) {}

  getEmployee() {
    this.logger.log(/* log something*/);
    // return employee;
  }
}
```

Register all the services with Dil container
```javascript
// app.ts
import { container } from '@samarth-srivastava/dil';
import { LoggerService } from './services/LoggerService';
import { UserService } from './services/UserService';
import { EmployeeService } from './services/EmployeeService';

// Register services
container.registerSingleton<LoggerService>('loggerService', LoggerService);
container.register<UserService>('userService', UserService, ["loggerService"]);
container.register<EmployeeService>('empService', EmployeeService, ["loggerService"]);

// Resolve the userService and use it
const userService = container.resolve<UserService>('userService');
const user = userService.getUser();

// Resolve the employeeService and use it
const employeeService = container.resolve<EmployeeService>('empService');
const employee = employeeService.getEmployee();
```


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/Samarth-Srivastava)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/samarthsrivastava/)

