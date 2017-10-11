<?php

require("./helpers.php");

$myInput = $argv[1];

println("My input: $myInput");
printSeparator();

$myArray = [
    "Smith" => ["John", 20],
    "Adams" => ["Jane", 25],
    "Crow" => ["Jack", 21]
];

foreach ($myArray as $lastName => $data) {
    // Display name
    $fullName = "$data[0] $lastName";

    println("My name is $fullName.");
    isNameLong($fullName);
    println();

    // Display age
    $age = $data[1];

    println("I am $age years old.");
    drinkSakeTonight($age);
    printSeparator();
}