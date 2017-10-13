<?php

try {
    // Create a test table
    DB::statement('CREATE TABLE pets (name VARCHAR(50), alive BOOLEAN)');
    echo "Creation successful...\n";

    // Insert a record
    DB::insert('INSERT INTO pets (name, alive) values ("Fluffy", TRUE)');
    echo "Insertion successful...\n";

    // Query records
    $results = DB::select('SELECT name from pets where alive = TRUE');
    echo "Query successful...\n";

    // Drop table
    DB::statement('DROP TABLE pets');
    echo "Destruction successful.\n";

    // Print success and exit
    echo "Looks like you're good to go. Have it, and Godspeed!\n";

    exit();

} catch (Exception $exception) {
    // Drop table on error
    DB::statement('DROP TABLE IF EXISTS pets');

    echo "Hit an exception: $exception\n";
    echo "Fetch one of your TAs for help!\n";
    echo "Exiting...\n";

    // Exit tinker
    exit();

}