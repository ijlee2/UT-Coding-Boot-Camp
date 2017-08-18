var api_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

$(document).ready(function() {
    $("#button_search").on("click", function() {
        var query            = $("#query").val();
        var yearBegin        = $("#yearBegin").val() + "0101";
        var yearEnd          = $("#yearEnd").val()   + "1231";
        var numPagesReturned = parseInt($("#numPagesReturned").find(":selected").text());

        var parameters = {"api-key"   : "97cf7b2b109345febdef229d0e7d8edc",
                          "q"         : query,
                          "begin_date": yearBegin,
                          "end_date"  : yearEnd,
                          "sort"      : "newest"};

        if (yearBegin === "0101") {
            delete parameters.begin_date;
        }

        if (yearEnd === "1231") {
            delete parameters.end_date;
        }
        
        api_url += '?' + $.param(parameters);

        // Call the API
        $.ajax({
            "url"   : api_url,
            "method": "GET"

        }).done(function(data) {
            console.log(data);

            var output = "";

            for (var i = 0; i < numPagesReturned; i++) {
                output += `<div class="pageReturned" data-url="${data.response.docs[i].web_url}">
                               <div>Title: ${data.response.docs[i].headline.main}</div>
                               <div>Snippet: ${data.response.docs[i].snippet}</div>
                               <div>Link: <a href="${data.response.docs[i].web_url}" target="_blank">${data.response.docs[i].web_url}</a></div>
                           </div>`;
            }

            $("#results").html(output);

            $(".pageReturned").on("click", function() {
                window.open($(this).attr("data-url"));
            });

        }).fail(function(error) {
            throw error;

        });
    });
});