# Bamazon
Bamazon is a CRM that focuses on sales. It provides command-line interfaces for customers, managers, and supervisors.


## Technologies Used
- [x] ES6

- [x] Node.js

- [x] MySQL


## How to Run
To run Bamazon on Windows and Mac, you will need [Bash](https://git-scm.com/downloads/), [Node](https://nodejs.org/en/), [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm), and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).

1. In Bash, type `git clone git@github.com:ijlee2/bamazon.git` to download Bamazon.

![How to Run: Step 1](images/how_to_run_step1.png?raw=true)

2. Then, type `cd bamazon; npm install` to download the required packages.

![How to Run: Step 2](images/how_to_run_step2.png?raw=true)

3. In MySQL Workbench, run `bamazon_schema.sql` then `bamazon_seeds.sql`.

![How to Run: Step 3](images/how_to_run_step3.png?raw=true)

4. Finally, in Bash, type `node bamazonCustomer.js` to log in as a customer, `node bamazonManager.js` as a manager, and `node bamazonSupervisor.js` as a supervisor.

![How to Run: Step 4](images/how_to_run_step4.png?raw=true)


## Demos - Customer

As a customer, you can check items (products) that are for sale and buy them.

To buy an item, enter the item ID and quantity. You will get the subtotal.

![Customer: Step 1](images/customer_step1.png?raw=true)

Note, you can buy an item only up to the stock quantity.

![How to Run: Step 2](images/customer_step2.png?raw=true)


## Demos - Manager

As a manager, you can add new items and restock them.

### Add a New Product

To add an item, enter the item name, department name (make a selection), price, and stock quantity.

![Manager: Step 1](images/manager_step1.png?raw=true)

### View Products for Sale

Check items that are for sale.

![Manager: Step 2](images/manager_step2.png?raw=true)

### Add to Inventory

Let's stock more Until Dawn!

![Manager: Step 3](images/manager_step3.png?raw=true)

### View Low Inventory

Finally, you can check which items have fewer than 5 in stock.

![Manager: Step 4](images/manager_step4.png?raw=true)


## Demos - Supervisor

As a supervisor, you can add new departments and check their profits.

### Add a New Department

To add a department, enter the department name and overhead costs.

![Supervisor: Step 1](images/supervisor_step1.png?raw=true)

### View Department Sales

You can check the overhead costs, sales, and profits of each department.

![Supervisor: Step 2](images/supervisor_step2.png?raw=true)
