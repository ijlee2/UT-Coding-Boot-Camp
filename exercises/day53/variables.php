<?php

$firstName = "John";
$lastName  = "Smith";
$age       = 20;

$fullName  = "$firstName $lastName";

echo "My name is $fullName\n";

if (strlen($fullName) > 12) {
    echo "It's a long name.\n";

} else {
    echo "It's a short name.\n";

}

echo str_repeat("-", 50) . "\n";

echo "I am $age years old.\n";

if ($age > 21) {
    echo "Sake! Sake! Sake!\n";

} else if ($age < 21) {
    echo "No sake for you :(\n";

} else {
    echo "Just slipped by. Sake! Sake! Sake!\n";

}