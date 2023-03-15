import mysql from 'mysql2'
import * as dotenv from 'dotenv'
dotenv.config()

const online = process.env.JAWSDB_URL
const offline = {
  port: 3306,
  // host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

const db = mysql.createConnection(online || offline)
db.connect()
const seed = async () => {
  try {
    const p = new Promise((resolve, reject) => {
      db.query(
        `DROP DATABASE IF EXISTS ems;
		CREATE DATABASE ems;
		
		USE ems;
		
		DROP TABLE IF EXISTS department;
		DROP TABLE IF EXISTS role;
		DROP TABLE IF EXISTS employee;
		
		CREATE TABLE department (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(30) UNIQUE NOT NULL
		);
		
		CREATE TABLE role (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(30) UNIQUE NOT NULL,
			salary DECIMAL NOT NULL,
			department_id INT,
			FOREIGN KEY (department_id)
			REFERENCES department(id)
			ON DELETE SET NULL
		);
		
		CREATE TABLE employee (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			first_name VARCHAR(30) NOT NULL,
			last_name VARCHAR(30) NOT NULL,
			role_id INT,
			manager_id INT,
			FOREIGN KEY (role_id) 
			REFERENCES role(id) 
			ON DELETE SET NULL,
			FOREIGN KEY (manager_id) 
			REFERENCES employee(id) 
			ON DELETE SET NULL
		);
		
		INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead",         100000, 1),
       ("Salesperson",         80000, 1),
       ("Lead Engineer",      150000, 2),
       ("Software Engineer",  120000, 2),
       ("Account Manager",    160000, 3),
       ("Accountant",         125000, 3),
       ("Legal Team Lead",    250000, 4),
       ("Lawyer",             190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John",   "Doe",      1, null),
       ("Mike",   "Chan",     2, 1),
       ("Ashley", "Rodriguez",3, null),
       ("Kevin",  "Tupik",    4, 3),
       ("Kunal",  "Singh",    5, null),
       ("Malia",  "Brown",    6, 5),
       ("Sarah",  "Lourd",    7, null),
       ("Tom",    "Allen",    8, 7);
`,
        (err, result) => (err ? reject(err) : resolve(result))
      )
    })
    await p
  } catch (error) {
    console.error(error)
  } finally {
    db.end()

    process.exit(1)
  }
}

await seed()
