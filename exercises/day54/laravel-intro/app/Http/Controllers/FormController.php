<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class FormController extends Controller
{
    //
    public function index() {
        $site_title = "Submit Form";

        return view("form", compact("site_title"));
    }
}
