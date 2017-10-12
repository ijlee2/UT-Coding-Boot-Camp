@extends("layout")

@section("title")
    {{ $site_title }}
@endsection

@section("content")
    <div class="jumbotron">
        <h1 class="display-3 text-center">About Me</h1>
    </div>

    <p>My name is {{ $firstName }} {{ $lastName }}. You can email me at <a href="mailto:{{ $email }}">{{ $email }}</a>.</p>
@endsection