-- INSERT INTO department(name)
-- VALUES ('FINANCE');

-- INSERT INTO role(title, salary, department_id)
-- VALUES ('ACCOUTANT', 80000, 1);

-- INSERT INTO employee(first_name, last_name, role_id)
-- VALUES ('RYAN', 'BOWEN', 1);

-- SUITS THE SHOW DATA

INSERT INTO department(name)
    VALUES  ("Customer Service"),
            ("Finance"),
            ("Legal"),
            ("Sales");

INSERT INTO role(title, salary, department_id)
    VALUES  ("Secretary", 50000, 1),
            ("Account Manager", 75000, 2),
            ("Accountant", 140000, 2),
            ("Legal Team Lead", 200000, 3),
            ("Senior Associate", 180000, 3),
            ("Junior Associate", 120000, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
    VALUES  ("Harvey", "Specter", 4, NULL),
            ("Mike", "Ross", 6, 1),
            ("Donna", "Paulsen", 2, 1),
            ("Louis", "Litt", 7, 1),
            ("Katrina", "Bennett", 5, NULL);
