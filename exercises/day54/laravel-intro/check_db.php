<?php

try {
  // Create a test table
  DB::statement('create table pets (name string, alive boolean)');
  echo "Creation successful...\n";

  // Insert a record
  DB::insert('insert into pets (name, alive) values (?, ?)', ['Fluffy', '1']);
  echo "Insertion successful...\n";

  // Query records
  $results = DB::select('select name from pets where alive = 1');
  echo "Query successful...\n";

  // Drop table
  DB::statement('drop table pets');
  echo "Destruction successful.\n";

  // Print success and exit
  echo "Looks like you're good to go. Have it, and Godspeed!\n";
  exit();
} catch (Exception $exception) {
  // Drop table on error
  DB::statement('drop table if exists pets');

  echo "Hit an exception: $exception\n";
  echo "Fetch one of your TAs for help!\n";
  echo "Exiting...\n";

  // Exit tinker
  exit();
}
