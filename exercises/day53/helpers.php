<?php

function println($string) {
    echo "$string\n";
}

function printSeparator($char = "-", $length = 50) {
    println(str_repeat($char, $length));
}

function isNameLong($fullName) {
    if (strlen($fullName) > 12) {
        println("It's a long name.");

    } else {
        println("It's a short name.");

    }
}

function drinkSakeTonight($age) {
    if ($age > 21) {
        println("Sake! Sake! Sake!");

    } else if ($age < 21) {
        println("No sake for you :(");

    } else {
        println("Just slipped by. Sake! Sake! Sake!");

    }
}