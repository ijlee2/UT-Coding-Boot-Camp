<?php

class Charizard {

  public $name = "Charizard";

  public $species = "Flame Pokemon";

  public $description = "Spits fire that is hot enough to melt boulders." .
                        "Known to cause forest fires unintentionally.";

  private $weight = "199.5lbs";

  private $abilities = ["Blaze", "Solar Power"];

  public function speak () {
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

  private function println ($string) {
    echo "$string\n";
  }

}
