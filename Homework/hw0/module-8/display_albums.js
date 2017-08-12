// Keep track of which album is displayed
var currentAlbumID = 0;

function changeAlbum(increment) {
    // Retrieve all albums
    var albums    = document.getElementsByClassName("albums");
    var numAlbums = albums.length;

    // Update the album counter
    currentAlbumID = (currentAlbumID + increment + numAlbums) % numAlbums;

    // Display the album
    for (var i = 0; i < numAlbums; i++) {
        if (i != currentAlbumID) {
            albums[i].style.display = "none";

        } else {
            albums[i].style.display = "block";

        }
    }
}