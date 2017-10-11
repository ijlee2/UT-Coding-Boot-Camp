<?php

// Convention is to use capitals to name classes.
require './Charizard.php';

/* You can instantiate objects with or without parentheses.
 *   This is the same in JavaScript, coincidentally. 
 */
$charizard = new Charizard;
$charizard = new Charizard();

// This is a public method, so we can call it.
$charizard->speak();

// This is a public method, so we can call it.
$charizard->attack();

/* This is a private method, so we can't call it. Charizard
 *   can call it inside of its own methods, like speak and attack,
 *   but we can't use it ourselves.
 */
$charizard->println("Oops, I killed my program.");
