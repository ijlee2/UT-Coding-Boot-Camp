/****************************************************************************
 ****************************************************************************
    
    Configure API
    
*****************************************************************************
*****************************************************************************/
var api_url = "http://api.brewerydb.com/v2/?key=cc8daa1e9ba37ff2c611bfa432a7d04a&format=json";

/*
$.ajax({
    "url"   : api_url,
    "method": "GET"}

).done(function(response) {
    console.log(response);
});
*/

$.getJSON(api_url, function(json) {
    console.log(json);
});

$(document).ready(function() {

});