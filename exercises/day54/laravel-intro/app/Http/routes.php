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

Route::get("/", "HomeController@index");

Route::get("/about", "AboutController@index");


//Route::get("/users", "UsersController@index");

// Using --resource
Route::resource("user", "UsersController");

// https://laravel.com/docs/5.5/routing
// GET -> index, create, edit, show
Route::get("/create_user", "UsersController@create");

// POST -> store
Route::post("/create_user", "UsersController@store");

// PATCH -> update

// DELETE -> destroy
Route::delete("/user/:id", "UsersController@destroy");