<?php

$myInput = $argv[1];
echo "My input: $myInput\n";

echo str_repeat("-", 50)."\n";


$myArray = array("John Smith" => 20, "Jane Adams" => 25, "Jack Crow" => 21);

foreach ($myArray as $fullName => $age) {
    // Display name
    echo "My name is $fullName\n";

    if (strlen($fullName) > 12) {
        echo "It's a long name.\n";

    } else {
        echo "It's a short name.\n";

    }

    echo "\n";

    // Display age
    echo "I am $age years old.\n";

    if ($age > 21) {
        echo "Sake! Sake! Sake!\n";

    } else if ($age < 21) {
        echo "No sake for you :(\n";

    } else {
        echo "Just slipped by. Sake! Sake! Sake!\n";

    }


    echo str_repeat("-", 50)."\n";
}