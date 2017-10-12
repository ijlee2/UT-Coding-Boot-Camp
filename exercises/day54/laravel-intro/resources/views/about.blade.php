@extends("layout")

@section("title")
    {{ $site_title }}
@endsection

@section("content")
    <div class="jumbotron">
        <h1 class="display-3 text-center">About Me</h1>
        <h2>{{ $firstName }} {{ $lastName }}</h2>
        <h3>{{ $email }}</h3>
    </div>
@endsection