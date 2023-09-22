USE employeesDB;
INSERT INTO department (name)
VALUES 
('Information Technology'),
('Finance'),
('Sales'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 95500, 1),
('Software Engineer', 132500, 1),
('Accountant', 50000, 2), 
('Finanical Analyst', 13700, 2),
('Marketing Coordindator', 88000, 3), 
('Sales Lead', 110000, 3),
('Project Manager', 120000, 4),
('Operations Manager', 95000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Mike', 'Houston', 2, null),
('Kyle', 'Corver', 1, 1),
('Elon', 'Musk', 4, null),
('Clarence', 'Philips', 3, 3),
('Michael', 'Stevens', 6, null),
('Von', 'Cleo', 5, 5),
('Sarah', 'Peters', 7, null),
('Ashley', 'Olsen', 8, 7);

