// Change the default message
Dropzone.prototype.defaultOptions.dictDefaultMessage = "Drop photos here to upload";

Dropzone.options.uploadWidget = {
    "paramName"  : "file",
    "maxFilesize": 5, // MB
    "maxFiles"   : 5,
    "dictDefaultMessage": "Drop photos here to upload",
    "headers": {
        // TODO: Create a random CSRF (Cross-Site Request Forgery) token for extra security measure
//      "x-csrf-token": document.querySelectorAll("meta[name=csrf-token]")[0].getAttributeNode("content").value
        "x-csrf-token": "TODO_CREATE_A_RANDOM_TOKEN_HERE"
    },
    "acceptedFiles": "image/*",

    "init": function() {
        this.on("success", (file, res) => {
            console.log(file);
            console.log(res);
        });

        this.on("thumbnail", file => {
            if (file.width < 200 || file.height < 200) {
                file.rejectDimensions();

            } else {
                file.acceptDimensions();

            }
        });
    },

    "accept": function(file, done) {
        file.acceptDimensions = done;
        
        file.rejectDimensions = function() {
            done("The image must be at least 200 x 200px.");
        };
    },

    //John's attempt to fix bug. 
    "success": function(file, serverResponse){
        console.log("Success");
    }
};

// =============================
// Begin insertion of John's code snippet to upload photos to S3.
// Here are the links to the pages that guided this process:
// https://devcenter.heroku.com/articles/s3-upload-node
// https://github.com/flyingsparx/NodeDirectUploader/blob/master/views/account.html
//==============================
/*
Function called when file input updated. If there is a file selected, then
start upload procedure by asking for a signed request from the app.
*/

// function initUpload(){
//     const files = $('#mai-photos').files;
//     const file = files[0];
//     if(file == null){
//         return alert('No file selected.');
//     }
//     getSignedRequest(file);
//     };


/*Function to get the temporary signed request from the app.
If request successful, continue to upload the file using this signed
request.
*/

// function getSignedRequest(file){
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
//     xhr.onreadystatechange = () => {
//       if(xhr.readyState === 4){
//         if(xhr.status === 200){
//           const response = JSON.parse(xhr.responseText);
//           uploadFile(file, response.signedRequest, response.url);
//         }
//         else{
//           alert('Could not get signed URL.');
//         }
//       }
//     };
//     xhr.send();
//   };

/*Function to carry out the actual POST request to S3 using the signed request from the app.
*/
    // function uploadFile(file, signedRequest, url){
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', signedRequest);
    //     xhr.onreadystatechange = () => {
    //       if(xhr.readyState === 4){
    //         if(xhr.status === 200){
    // //           $('#mai-photos').value = url; QUESTION FOR ISAAC
    //         }
    //         else{
    //           alert('Could not upload file.');
    //         }
    //       }
    //     };
    //     xhr.send(file);
    //   };

//==============================
// End John's Code Snippet
//==============================

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav({"closeOnClick": true});

    // =============================
    // Begin insertion of John's code snippet to upload photos to S3.
    //==============================

    // $("#mai-photos").onchange = initUpload();

    //==============================
    // End John's Code snippet
    //==============================
});