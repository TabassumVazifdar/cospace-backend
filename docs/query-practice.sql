CREATE DATABASE sandbox;
USE sandbox;

CREATE TABLE departments (
  id   INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  name          VARCHAR(100) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
INSERT INTO departments (name)
VALUES 
('HR'),
('Finance'),
('IT'),
('Manufacturing');
INSERT INTO employees (name, department_id)
VALUES
('Alice', 1),
('Bob', 2),
('Lewis', 3),
('Charles', 1),
('Oscar', 3);

INSERT INTO employees (name)
VALUES ('Max');

SELECT * FROM employees;
SELECT * FROM departments;

SELECT 
e.name, 
d.name

FROM employees as e

INNER JOIN departments as d
ON d.id = e.department_id;

SELECT 
e.name, 
d.name

FROM employees as e

LEFT JOIN departments as d
ON d.id = e.department_id;

SELECT 
e.name, 
d.name

FROM departments as d

LEFT JOIN employees as e
ON d.id = e.department_id
WHERE e.department_id IS NULL;


SELECT 
d.id,
d.name,
COUNT(e.department_id)

FROM 
departments as d

LEFT JOIN employees as e
ON d.id = e.department_id
GROUP BY d.id, d.name;

UPDATE employees
SET department_id = 4
WHERE name = "Alice";

DELETE FROM employees
WHERE name = "Bob";

SELECT * FROM employees;
SELECT * FROM departments;