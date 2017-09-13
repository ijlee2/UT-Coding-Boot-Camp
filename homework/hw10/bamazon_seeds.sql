USE bamazon_db;

INSERT INTO departments (department_name, overhead_costs) VALUES
("Books", 52000.00),
("CDs & Vinyl", 9000.00),
("Home & Kitchen", 80000.00),
("Movies & TV", 15000.00),
("Musical Instruments", 27000.00),
("Sports & Fitness", 63000.00),
("Video Games", 44000.00);

INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES
("Bed Sheet", 3, 19.99, 390),
("Bed Sheet Deluxe", 3, 39.99, 147),
("Doormat", 3, 11.99, 40),
("Drive", 4, 9.99, 4729),
("Drum Set", 5, 299.00, 7),
("Dumbbell Set", 6, 259.00, 2),
("Elliptical Machine", 6, 177.88, 20),
("Electric Guitar", 5, 149.50, 4),
("First 100 Words", 1, 5.11, 3),
("Giraffes Can't Dance", 1, 5.33, 91),
("Goodnight Moon", 1, 5.66, 477),
("Guess How Much I Love You", 1, 6.99, 647),
("Logan", 4, 14.99, 3710),
("Microsoft Xbox One", 7, 237.95, 3491),
("Nintendo Switch", 7, 349.20, 7392),
("Playstation 4 Pro", 7, 399.00, 1832),
("Sewing Machine", 3, 168.49, 27),
("The Giving Tree", 1, 11.33, 214),
("The Very Hungry Caterpillar", 1, 6.89, 526),
("Toilet Papers", 3, 12.00, 85),
("Ukelele", 5, 59.99, 60),
("Uncharted 4", 7, 59.99, 63),
("Until Dawn", 7, 19.99, 371),
("Wonder Woman", 4, 24.99, 2673),
("Yoga Mat", 6, 19.99, 5788);

SELECT p.item_id, p.product_name, d.department_name, p.price, p.stock_quantity, p.product_sales
FROM products AS p
INNER JOIN departments AS d
ON p.department_id = d.department_id;