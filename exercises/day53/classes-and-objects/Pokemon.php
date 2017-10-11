<?php

class Pokemon {

  public $name;

  public $species;

  public $description;

  private $weight;

  private $abilities;

  // The __construct function takes any arguments we need to initialize our
  // object. This is called whenever we create a Pokemon with the 'new' keyword.
  public function __construct ($name, $species, $description, $weight,
                               $abilities) {
    $this->name = $name;
    $this->species = $species;
    $this->description = $description;
    $this->weight = $weight;
    $this->abilities = $abilities;
  }

  public function speak () {
     $this->println($this->name);
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

  /**
   * By making the visibility of this "protected", we can use the method from sub-classes.
   */
  protected function println ($string) {
    echo "$string\n";
  }

}
