<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It"s a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get("/", function() {
    $site_title = "Home";

    return view("home", compact("site_title"));
});

Route::get("/about", function() {
    $site_title = "About Us";

    return view("about", compact("site_title"));
});