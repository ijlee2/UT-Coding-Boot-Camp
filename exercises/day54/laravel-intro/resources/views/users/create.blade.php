@extends("layout")

@section("title")
    {{ $site_title }}
@endsection

@section("content")
    <div class="jumbotron">
        <h1 class="display-3 text-center">Submit this form</h1>
    </div>
    <form action="">
        <div class="form-group">
            <label for="user_fullname">Full name</label>
            <input type="email" class="form-control" id="user_fullname" placeholder="Enter first and last names">
        </div>

        <div class="form-group">
            <label for="user_email">Email</label>
            <input type="email" class="form-control" id="user_email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
            <label for="user_password">Password</label>
            <input type="password" class="form-control" id="user_password" placeholder="Password">
        </div>

        <button type="submit" class="btn btn-lg btn-success">Submit</button>

        {{ csrf_field() }}
    </form>
@endsection