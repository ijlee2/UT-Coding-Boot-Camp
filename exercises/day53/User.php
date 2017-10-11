<?php

class User {
    public $firstName, $lastName, $email;
    public $url_profile;

    // Constructor
    public function __construct($firstName, $lastName = "", $email) {
        $this->firstName = $firstName;
        $this->lastName  = $lastName;
        $this->email     = $email;
    }

    public function getFullName() {
        return $this->firstName." ".$this->lastName;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getProfileUrl() {
        return $this->url_profile;
    }

    public function setProfileUrl($url_profile) {
        $this->url_profile = $url_profile;
    }

    public function getProfile() {
        echo "Name: ".$this->getFullName()."\n";
        echo "Email: ".$this->getEmail()."\n";
        echo "Profile: ".$this->getProfileUrl()."\n";
        echo "\n";
    }
}

$user1 = new User("John", "Smith", "john.smith@example.com");
$user1->setProfileUrl("john.google.com");
$user1->getProfile();

$user2 = new User("Jane", "Smith", "jane.smith@example.com");
$user2->setProfileUrl("jane.google.com");
$user2->getProfile();