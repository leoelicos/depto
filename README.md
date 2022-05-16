# Employee Management System

![MySQL](https://img.shields.io/badge/2.3.3-0?label=MySQL&style=for-the-badge&labelColor=white&color=black) ![Inquirer](https://img.shields.io/badge/8.2.4-0?label=Inquirer&style=for-the-badge&labelColor=white&color=black) ![chalk](https://img.shields.io/badge/4.1.2-0?label=chalk&style=for-the-badge&labelColor=white&color=black)

## Introduction

This easy-to-use employee management system allows the user to perform CRUD actions like view, add, update and delete. It would allow a business manager to add and save business data in order to better arrange and document CRUD.

This CLI application uses npm packages `inquirer`, `SQL` and `chalk`.

I made this app in order to learn how to use SQL queries.

I used GitHub Projects and various Pull Requests to create this app: https://github.com/leoelicos/bcs-12-employee-management-system/projects/1

## Installation

Source code: [Employee Management System on GitHub](https://github.com/leoelicos/bcs-12-employee-management-system).

| Step                          | Instruction                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------ |
| install node                  | https://nodejs.org/en/download/                                                |
| install mysql                 | https://dev.mysql.com/downloads/installer/                                     |
| clone this repo               | `git clone https://github.com/leoelicos/bcs-12-employee-management-system.git` |
| Go inside the database folder | `cd db`                                                                        |
| invoke mysql                  | `mysql -u root -p`                                                             |
| Enter your mysql password     | `{password}`                                                                   |
| Create schema                 | `source schema.sql`                                                            |
| (optional) Add dummy data     | `source seeds.sql`                                                             |
| Exit mysql                    | `exit`                                                                         |
| Import dependencies           | `npm i`                                                                        |
| Start the app                 | `npm start`                                                                    |

## Demo

### Video demo

https://user-images.githubusercontent.com/99461390/168465029-867e7224-30ab-4c93-b211-7c3a8250b9cd.mp4

Also on [YouTube](https://www.youtube.com/watch?v=W58SFkcsXkM)

## Usage

### Keyboard commands

| Step                | Keyboard commands                     |
| ------------------- | ------------------------------------- |
| Navigate menu items | <kbd>Up ↑</kbd> and <kbd>Down ↓</kbd> |
| Select menu items   | <kbd>Enter ↵</kbd>                    |

### GUI

| Menu                                     | What it does                                      |
| ---------------------------------------- | ------------------------------------------------- |
| View All Departments                     | Print table of all departments in database        |
| View All Roles                           | Print table of all roles in database              |
| View All Employees                       | Print table of all employees in database          |
| View Employees by Department             | Print table of employees in specific department   |
| View Employees by Manager                | Print table of employees with specific manager    |
| View Total Utilized Budget by Department | Print table of budget used by specific department |
| Add Department                           | Add a department, like `Legal` and `Finance`      |
| Add Role                                 | Add a role, like `Manager` and `Engineer`         |
| Add Employee                             | Add an employee, like `John Prescott`             |
| Update Employee Role                     | Assign specific role to specific employee         |
| Update Employee Manager                  | Assign specific manager to specific employee      |
| Delete Department                        | Delete specific department from database          |
| Delete Role                              | Delete specific role from database                |
| Delete Employee                          | Delete specific employee from database            |
| Quit                                     | Exit the application                              |

## Screenshots

### Screenshot: Menu

![Screenshot: Menu](https://user-images.githubusercontent.com/99461390/168408340-d34d4fb2-531b-42b7-b1a3-235b20863510.jpg)

### Screenshot: View Departments

![Screenshot: View Departments](https://user-images.githubusercontent.com/99461390/168408341-0962bbd5-11c0-4cc2-a5b9-8247c1a13515.jpg)

### Screenshot: View all Roles

![Screenshot: View all Roles](https://user-images.githubusercontent.com/99461390/168408342-a9ebed49-fe90-49d8-8e1f-66686744b280.jpg)

### Screenshot: View all Employees

![Screenshot: View all Employees](https://user-images.githubusercontent.com/99461390/168408344-2399db85-399c-4a36-87d1-de0b276334c2.jpg)

### Screenshot: View all Employees by Department

![Screenshot: View all Employees by Department](https://user-images.githubusercontent.com/99461390/168408345-a3845ffe-a0aa-436e-9f26-5e630fa0e8ee.jpg)

### Screenshot: View all Employees by Manager

![Screenshot: View all Employees by Manager](https://user-images.githubusercontent.com/99461390/168408347-15ee2c1e-3d0d-4ee7-88ae-2f6e02d852db.jpg)

### Screenshot: View Total Utilized Budget by Department

![Screenshot: View Total Utilized Budget by Department](https://user-images.githubusercontent.com/99461390/168408349-bb7c36a2-a579-49f6-8288-4097fdf6eeaf.jpg)

### Screenshot: Error Handling

![Screenshot 2022-05-14 234916](https://user-images.githubusercontent.com/99461390/168428587-8cf565fb-be8b-45b5-87ed-1edc9adf227b.jpg)

## Credits

-  BCS Resources

## License

&copy; Leo Wong <leoelicos@gmail.com>

Licensed under the [MIT License](./LICENSE).
