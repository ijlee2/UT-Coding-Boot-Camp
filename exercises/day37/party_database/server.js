const orm = require("./config/orm.js");

// Find all parties and order them by cost
orm.selectAndOrder("*", "parties", "party_cost");

// Find a party with the name 
orm.selectWhere("parties", "party_name", "Top Gun");

// Find the client with the most parties
orm.findWhoHasMost("client_name", "client_id", "clients", "parties");