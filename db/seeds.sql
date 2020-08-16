INSERT INTO departments (name)
VALUES 
('Accounting'),
('Human Resources'),
('Engineering'),
('Product Development'),
('Administration'),
('TOP SECRET');

INSERT INTO roles (title, salary, department_id)
VALUES 
("Junior Accountant", 40000, 1),
("Junior Engineer", 41000, 3),
("Accounting Manager", 60000, 1),
("Engineering Manager", 61000, 3),
("Benefits Coordinator", 42000, 5),
("Development Manager", 43000, 4),
("Administrator", 44000, 1),
("--REDACTED--", 99999, 6);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Harry", "Porter", 3, NULL),
("Hermione", "Grainger", 4, NULL),
("Ronald", "McDonald", 1, 1),
("Ronaldo", "McDonaldo", 2, 2),
("Ronald", "Weasel", 5, NULL),
("Draco", "Milfoil", 6, NULL),
("Neville", "Shortbottom", 7, NULL),
("Severus", "Snake", 8, NULL),
("Albus", "Thimblewindow", 8, 8);