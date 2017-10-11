<?php

require("./User.php");

// Get form data
$names = explode(" ", $_GET["name"]);

$firstName = $names[0];
$lastName  = $names[1];
$email     = $_GET["email"];
$age       = $_GET["age"];

// Create the user
$user = new User($firstName, $email, $age, $lastName);

// Display the request method
echo "<p>Request method: " . $_SERVER['REQUEST_METHOD'] . "</p>";

// Display the user
$user->getProfile();