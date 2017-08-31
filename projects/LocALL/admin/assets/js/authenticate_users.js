/****************************************************************************
 ****************************************************************************
    
    Configure Firebase
    
*****************************************************************************
*****************************************************************************/
const config = {
    "apiKey"           : "AIzaSyDjGV94on0gidAzG2sLCy5F8s-tkQXAzPc",
    "authDomain"       : "locall-atx512.firebaseapp.com",
    "databaseURL"      : "https://locall-atx512.firebaseio.com",
    "projectId"        : "locall-atx512",
    "storageBucket"    : "locall-atx512.appspot.com",
    "messagingSenderId": "1032168672035"
};

firebase.initializeApp(config);

const database_users = firebase.database().ref("users");
const auth           = firebase.auth();

// ADMIN TODO: Uncomment to remove existing database (be careful!)
//database_users.remove();



/****************************************************************************
 ****************************************************************************
    
    Respond to user actions
    
*****************************************************************************
*****************************************************************************/
// When the page loads
let pageStatus = "signup";

$("#messageToUser").empty();
$("#messageToUser").css({"display": "none"});


$("#button_signup").click(function() {
    pageStatus = "signup";

    $("#header").text("Sign Up");
    $(".input_container, #button_submit").css({"display": "block"});

    $("#messageToUser").empty();
    $("#messageToUser").css({"display": "none"});
});


$("#button_login").click(function() {
    pageStatus = "login";

    $("#header").text("Log In");
    $(".input_container").css({"display": "none"});
    $("#userEmail_container, #userPassword_container, #button_submit").css({"display": "block"});

    $("#messageToUser").empty();
    $("#messageToUser").css({"display": "none"});
});


$("#button_logout").click(function() {
    auth.signOut();

    pageStatus = "logout";

    $("#header").text("Log Out");
    $(".input_container, #button_submit").css({"display": "none"});

    $("#messageToUser").text("See you again!");
    $("#messageToUser").css({"display": "block"});
});


$("#button_submit").click(function() {
    const name     = $("#userName").val();
    const email    = $("#userEmail").val();
    const password = $("#userPassword").val();
    const location = $("#userLocation").val();

    $("#messageToUser").empty();
    $("#messageToUser").css({"display": "block"});


    /************************************************************************
        
        Validate inputs
    
    *************************************************************************/
    let status, validationPassed = true;

    if (pageStatus === "signup" || pageStatus === "login") {
        if (pageStatus === "signup") {
            // Name
            status = checkName(name);

            if (status !== "success") {
                validationPassed = false;
                $("#messageToUser").append(`<p>${status}</p>`);
            }
        }

        // Email
        status = checkEmail(email);

        if (status !== "success") {
            validationPassed = false;
            $("#messageToUser").append(`<p>${status}</p>`);
        }
        
        // Password
        status = checkPassword(password);

        if (status !== "success") {
            validationPassed = false;
            $("#messageToUser").append(`<p>${status}</p>`);
        }
    }


    /************************************************************************
        
        Connect to Firebase
    
    *************************************************************************/
    if (validationPassed) {
        // Create an account on Firebase
        if (pageStatus === "signup") {
            auth.createUserWithEmailAndPassword(email, password)
                .then(function(user) {
                    database_users.child(user.uid).set({
                        "name"    : name,
                        "email"   : email,
                        "location": location
                    });
                })
                .catch(
                    e => console.log(e.message)
                );

        // Log in to an existing account
        } else if (pageStatus === "login") {
            auth.signInWithEmailAndPassword(email, password)
                .then(function(user) {
                    database_users.child(user.uid).once("value", function(snapshot) {
                        console.log("My name is: "     + snapshot.val().name);
                        console.log("My email is: "    + snapshot.val().email);
                        console.log("My location is: " + snapshot.val().location);
                    });
                })
                .catch(
                    e => console.log(e.message)
                );

        }

        auth.onAuthStateChanged(user => {
            if (user) {
                console.log("Logged in.");

            } else {
                console.log("Not logged in.");
                
            }
        });
    }
});



/****************************************************************************
 ****************************************************************************
    
    Input validations
    
*****************************************************************************
*****************************************************************************/
let regex;

// Name consists of all letters and possibly a space
function checkName(name) {
    if (!name) {
        return "Please enter your name.";
    
    } else {
        regex = /^[a-z]+$/i;

        const names    = name.split(" ");
        const numNames = names.length;

        if (numNames <= 2 && !names[0].match(regex)) {
            return "Please enter only letters for your first name.";

        } else if (numNames === 2 && !names[1].match(regex)) {
            return "Please enter only letters for your last name.";

        } else if (numNames > 2) {
            return "Please enter only your first and last names.";

        }
    }

    return "success";
}

// Email must have format of ***@***.com (*** cannot be empty)
function checkEmail(email) {
    if (!email) {
        return "Please enter your email.";
    
    } else {
        regex = /^[a-z0-9._]+@[a-z]+.(com|net|edu)$/i;
        
        if (!email.match(regex)) {
            return "Please enter a valid email address (.com, .net, or .edu).";
        }
    }

    return "success";
}

// Password must have 8-64 characters and include 1 letter, 1 number, and 1 special character
function checkPassword(password) {
    if (!password) {
        return "Please enter your password.";
        
    } else {
        if (password.length < 8 || password.length > 64) {
            return "Password length must be between 8 and 64.";
        }

        regex = /[a-z]+/i;

        if (!password.match(regex)) {
            return "Password must contain at least 1 letter.";
        }

        regex = /[0-9]+/;

        if (!password.match(regex)) {
            return "Password must contain at least 1 number.";
        }

        regex = /[!@#$%^&*()<>{}\[\]-_+=|\\;:'",./?]+/;

        if (!password.match(regex)) {
            return "Password must contain at least 1 special character.";
        }
    }

    return "success";
}