<?php
require './Pokemon.php';
// Charizard still has methods like getWeight, etc., because it "inherits"
// them from the "parent" Pokemon class. This is what extends accomplishes.
class Charizard extends Pokemon
{
  public function __construct()
  {
    // We call the parent constructor using our default parameters
    parent::__construct("Charizard", "Flame Pokemon",
                        "Spits fire that is hot enough to melt boulders." . 
                        "Known to cause forest fires unintentionally.",
                        "199.5lbs", ["Blaze", "Solar Power"]
    );
  }
  /**
   * We can create additional methods as well.
   */
  public function breatheFire ()
  {
    $this->println($this->name . " is breathing fire! It's super hot!");
  }
}
