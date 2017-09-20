**Instructions:**

* Spend the next few ~15 minutes with your partner answering the following questions. You should be using the Sequelize Documentation (and whatever other references you find online).

  * Question: What is Sequelize?

    * ORM.

  * Question: What advantages does it offer?

    * Easy to test.
    * Gives you support for syncing databases.
    * Validation, restricts to specific form of data.
    * Complex SQL queries in simple syntax,

  * Question: How do I install it? How do I incorporate it into my app?

    * `npm install --save sequelize`

  * Question: What the heck is a Sequelize model? What role will it play?

    * A representation of table data for Sequelize

  * Let's say I have the below table in MySQL.

    | Country     | PhoneCode | Capital   | IndependenceYear |
    | ----------- | --------- | --------- | ---------------- |
    | Afghanistan | 93        | Kabul     | 1919             |
    | Belarus     | 375       | Misk      | 1991             |
    | Netherlands | 31        | Amsterdam | 1648             |
    | Oman        | 968       | Muscat    | 1970             |
    | Zambia      | 260       | Lusaka    | 1964             |

    * Question: How would I model it in Sequelize?

      ```javascript
      var tableName = sequelize.define('tableName', {
        Country: {
          type: Sequelize.STRING
        },
        PhoneCode: {
          type: Sequelize.INTEGER
        },
        Capital: {
          type: Sequelize.STRING
        },
        IndependenceYear: {
          type: Sequelize.INTEGER
        },
      },
      {
        freezeTableName: true // Model tableName will be the same as the model name instead of being pluralized
      });

      // force: true will drop the table if it already exists
      tableName.sync({force: true}).then(function () {
        // Table created
        return tableName.create({
          Country: 'Afghanistan',
          PhoneCode: 93,
          Capital: 'Kabul',
          IndependenceYear: 1919
        });
      });
      ```

    * Question: How would I query for all the records where the Independence Year was less than 50 years ago?

      ```javascript
      tableName.findAll({
        where: {
          IndependenceYear: { $gt: new Date().getFullYear() - 50}
        }
      });
      ```

    * How would I query the table, order it by descending Independence Years, and limit the results to just show 2 of the records. Skipping the first two? (i.e. Results: Zambia, Afghanistan)

      ```javascript
      tableName.findAll({
        offset: 2,
        limit: 2,
        order: [[sequelize.col('IndependenceYear'), 'DESC']]
      })
      ```

  * Bonus: How do I use sequelize to make changes to an existing table with data in it?

    * Use sequelize migrations from the command line: <http://docs.sequelizejs.com/en/latest/docs/migrations/>
