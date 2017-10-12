<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class AboutController extends Controller
{
    //
    public function index() {
        // http://www.easylaravelbook.com/blog/2015/03/09/passing-multiple-variables-into-a-laravel-5-view/
        $site_title = "About Me";
        $firstName  = "Isaac";
        $lastName   = "Lee";
        $email      = "isaac.lee@example.com";

        return view("about", compact("site_title", "firstName", "lastName", "email"));
    }
}
