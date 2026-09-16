CREATE DATABASE training;
USE training;
CREATE TABLE users2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    active BOOLEAN DEFAULT TRUE
);


INSERT INTO users2 (name, email, age)
VALUES ('Alice', 'alice@example.com', 24);
DESCRIBE users2;


describe to show structure of table with variable types and if null etc- DESCRIBE users;.
select to show the table
if try null value empty will show error saying no default vlue
