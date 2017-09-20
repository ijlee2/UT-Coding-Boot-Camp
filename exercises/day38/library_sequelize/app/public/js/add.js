// The code in add.js handles what happens when the user clicks the "Add a book" button.

// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Make a newBook object
  var newBook = {
    title: $("#title").val().trim(),
    author: $("#author").val().trim(),
    genre: $("#genre").val().trim(),
    pages: $("#pages").val().trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newBook)
    // On success, run the following code
    .done(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#title").val("");
  $("#author").val("");
  $("#genre").val("");
  $("#pages").val("");

});
