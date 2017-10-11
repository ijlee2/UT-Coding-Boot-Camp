<?php

/* A class is a blueprint for creating objects. It tells you what 
*   properties and methods an object will have, and how they're defined.
*
*   The convention is to put properties at the top of your class,
*   and methods towards the bottom.
*
*   Ah, and by the way. In the world of classical OOP, properties are 
*   often called "member variables"; "member fields"; or just "fields",
*   and people or programs using this class are called "clients".      
*   */
class Charizard {
  
  // 'public' means clients of this class can access these fields.
  public $name = "Charizard";

  public $species = "Flame Pokemon";

  public $description = "Spits fire that is hot enough to melt boulders." . 
                        "Known to cause forest fires unintentionally.";

  // "private" means we can only see or use these fields inside of the class.
  private $weight = "199.5lbs";

  private $abilities = ["Blaze", "Solar Power"];
  
  /* Whenever you define a method inside of a class, you must mark it as
   *   public; private; or protected. We'll cover that last one shortly.  
   *
   *   Here, we have a public method, which any client can call. 
   *   */
  public function speak () {
    /* In $PHP, the $this keyword *always* means:
     *   "the object on which this method was called". */
     $this->println("Charizard!"); 
  }

  public function attack () {
    if (rand(0, 100) >= 80) {
      $attack = $this->abilities[1];

      $this->println("Critical hit!");
      $this->println("$this->name uses $attack!");
    } else {
      $attack = $this->abilities[0];
      $this->println("$this->name uses $attack!");
    }
  }

  public function getWeight () {
    return $this->weight;
  }

  /* By contrast, this is a private method, which we can only call within
   *   this class.
   *   */
  private function println ($string) {
    echo "$string\n";
  }
  
}
