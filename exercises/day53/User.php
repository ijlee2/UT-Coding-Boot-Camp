<?php

class User {
    public  $firstName;
    private $lastName, $email;
    public  $url_profile;

    private static $numUsers = 0;

    // Constructor
    public function __construct($firstName, $email, $lastName = "") {
        $this->firstName = $firstName;
        $this->lastName  = $lastName;
        $this->email     = $email;

        // Keep track of number of users
        self::$numUsers++;
    }

    public function getFullName() {
        return $this->firstName . " " . $this->lastName;
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
        echo "Name: " . $this->getFullName() . "\n";
        echo "Email: " . $this->getEmail() . "\n";
        echo "Profile: " . $this->getProfileUrl() . "\n";
        echo "\n";
    }

    // Static method, call it by using User::getNumUsers()
    public static function getNumUsers() {
        return self::$numUsers;
    }
}

$user1 = new User("John", "john.smith@example.com", "Smith");
$user1->setProfileUrl("john.google.com");
$user1->getProfile();

$user2 = new User("Jane", "jane@example.com");
$user2->setProfileUrl("jane.google.com");
$user2->getProfile();

echo "Number of users: " . User::getNumUsers() . "\n";