DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id),
CONSTRAINT DEPTID FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id VARCHAR(30),
PRIMARY KEY (id),
CONSTRAINT ROLEID FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

SELECT * FROM department;

INSERT INTO department(name)
VALUES("Development");

INSERT INTO department(name)
VALUES("Infrastructure");

INSERT INTO department(name)
VALUES("Human Resources");

INSERT INTO department(name)
VALUES("Finance");

INSERT INTO department(name)
VALUES("Sales");

INSERT INTO department(name)
VALUES("Professional Services");

SELECT * FROM role;

INSERT INTO role(title, salary, department_id)
VALUES("Chief Technology Officer", 243425 , 01);

INSERT INTO role(title, salary, department_id)
VALUES("Director of Engineering", 220000 , 01);

INSERT INTO role(title, salary, department_id)
VALUES("Senior Software Engineer", 160000 , 01);

INSERT INTO role(title, salary, department_id)
VALUES("Senior Front-end Developer", 160000 , 01);

INSERT INTO role(title, salary, department_id)
VALUES("Software Engineer", 140000 , 01);

INSERT INTO role(title, salary, department_id)
VALUES("Dev Ops Engineer", 150000 , 01);

INSERT INTO role(title, salary, department_id)
VALUES("Cloud Engineer", 150000 , 02);

INSERT INTO role(title, salary, department_id)
VALUES("Cloud Support Engineer", 150000 , 02);

INSERT INTO role(title, salary, department_id)
VALUES("Network Engineer", 150000 , 02);

INSERT INTO role(title, salary, department_id)
VALUES("VP, Human Resources", 160000 , 03);

INSERT INTO role(title, salary, department_id)
VALUES("Human Resources Generalist", 10000 , 03);

INSERT INTO role(title, salary, department_id)
VALUES("Chief Financial Officer", 220000 , 04);

INSERT INTO role(title, salary, department_id)
VALUES("Controller", 220000 , 04);

INSERT INTO role(title, salary, department_id)
VALUES("Payroll Administrator", 120000 , 04);

INSERT INTO role(title, salary, department_id)
VALUES("Senior Sales Executive", 160000 , 05);

INSERT INTO role(title, salary, department_id)
VALUES("Senior Sales Executive", 160000 , 05);

INSERT INTO role(title, salary, department_id)
VALUES("Senior Sales Executive", 160000 , 05);

INSERT INTO role(title, salary, department_id)
VALUES("Senior Sales Executive", 160000 , 05);

INSERT INTO role(title, salary, department_id)
VALUES("Inside Sales Executive", 65000 , 05);

INSERT INTO role(title, salary, department_id)
VALUES("Solutions Architect", 160000 , 06);

INSERT INTO role(title, salary, department_id)
VALUES("Solutions Architect", 160000 , 06);

INSERT INTO role(title, salary, department_id)
VALUES("Solutions Architect", 160000 , 06);

INSERT INTO role(title, salary, department_id)
VALUES("Project Manager", 160000 , 06);

INSERT INTO role(title, salary, department_id)
VALUES("Implementation Consultant", 160000 , 06);

INSERT INTO role(title, salary, department_id)
VALUES("VP, Professional Services", 185000 , 06);

SELECT * FROM employee;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Amanda", "D'Argenio", 01);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Michelle", "D'Argenio", 02);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Lisa", "D'Argenio", 03);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Justin", "Dujardin", 04);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Desi", "DiMaio", 05);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Melissa", "DiBartolo", 06);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Leanne", "Morici", 07);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Catherine", "Marino", 08);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Ronnie", "Altshuler", 09);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Julie", "Alex", 10);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Marco", "Lozito", 11);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Kasia", "Kern", 12);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Joseph", "Kern", 13);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Dave", "Chappelle", 14);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Mike", "Tyson", 15);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Joe", "Rogan", 16);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Aziz", "Ansari", 17);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Sebastian", "Maniscalco", 18);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Bill", "Burr", 19);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Conan", "O'Brien", 20);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Nicole", "Kidman", 21);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("John", "Lithgow", 22);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Jamie", "Fox", 23);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Eddie", "Murphy", 24);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Charlie", "Murphy", 25);











