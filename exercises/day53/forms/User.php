<?php

class User {
    public  $firstName, $email, $age;
    private $lastName;
    public  $url_profile;

    private static $numUsers = 0;

    // Constructor
    public function __construct($firstName, $email, $age, $lastName = "") {
        $this->firstName = $firstName;
        $this->lastName  = $lastName;
        $this->email     = $email;
        $this->age       = $age;

        // Keep track of number of users
        self::$numUsers++;
    }

    public function getFullName() {
        return $this->firstName . " " . $this->lastName;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getAge() {
        return $this->age;
    }

    public function getProfileUrl() {
        return $this->url_profile;
    }

    public function setProfileUrl($url_profile) {
        $this->url_profile = $url_profile;
    }

    public function getProfile() {
        echo "<p>Name: " . $this->getFullName() . "</p>";
        echo "<p>Email: " . $this->getEmail() . "</p>";
        echo "<p>Age: " . $this->getAge() . "</p>";
        echo "<p>Profile: " . $this->getProfileUrl() . "</p>";
    }

    // Static method, call it by using User::getNumUsers()
    public static function getNumUsers() {
        return self::$numUsers;
    }
}