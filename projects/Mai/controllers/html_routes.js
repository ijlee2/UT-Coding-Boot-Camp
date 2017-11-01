/****************************************************************************
 ****************************************************************************

    Initialize

*****************************************************************************
*****************************************************************************/
// Import packages
const express = require("express");
const path    = require("path");

// Create an instance of Router
const router = express.Router();

// Talk to the models
const models = require(path.join(__dirname, "..", "models"));
const Writer = models.Writer;
const Story  = models.Story;
const Photo  = models.Photo;
const Reader = models.Reader;

// Mai team
const maiTeam = [
    {
        "fullname"    : "John Absher",
        "url_photo"   : "assets/images/john_absher.jpg",
        "url_linkedin": "https://www.linkedin.com/in/johnabsher/",
        "biography"   : "Hand-delivered a bottle of Salt Lick BBQ sauce to the king of Norway."
    },
    {
        "fullname"    : "Brian Ervin",
        "url_photo"   : "assets/images/brian_ervin.jpg",
        "url_linkedin": "https://www.linkedin.com/in/brianervinmedia/",
        "biography"   : "Hotrodder, designer, and turtle rescuer. Now building beautiful custom UI."
    },
    {
        "fullname"    : "David Gutierrez",
        "url_photo"   : "assets/images/david_gutierrez.jpg",
        "url_linkedin": "https://www.linkedin.com/in/david-gutierrez-979a4a148/",
        "biography"   : "Once while sailing around the world, he discovered a short cut."
    },
    {
        "fullname"    : "Jason Joachim",
        "url_photo"   : "assets/images/jason_joachim.jpg",
        "url_linkedin": "https://www.linkedin.com/in/jasonjoachim/",
        "biography"   : "Heavy metal and experimental musician, now rocking web applications."
    },
    {
        "fullname"    : "Isaac Lee",
        "url_photo"   : "assets/images/isaac_lee.jpg",
        "url_linkedin": "https://www.linkedin.com/in/ijlee2/",
        "biography"   : "Amateur boulderer and public speaker. Feed him music and coffee."
    }
];

// Source: https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
function isValidCookie(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return (uuid && regex.test(uuid));
}

// Pass these values if the user is not logged in
const defaultValues = {
    "maiId"           : null,
    "maiFullname"     : null,
    "customCSS"       : ["style"],
    "customJavascript": ["index"]
};



/****************************************************************************
 ****************************************************************************

    Set up routes

*****************************************************************************
*****************************************************************************/
router.get("/", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];

    // Display homepage if the user is not logged in or does not have a valid cookie
    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    // Display the profile page if the user is logged in
    } else {
        function callback(results) {
            const stories = [];

            for (let i = 0; i < results[0].Stories.length; i++) {
                stories.push({
                    "id"   : results[0].Stories[i].id,
                    "title": results[0].Stories[i].title,
                    "url"  : results[0].Stories[i].Photos[0].dataValues.url
                });
            }

            // TODO: Calculate the number of stories, writers, and readers based on queries
            const writer = {
                "fullname"     : results[0].dataValues.fullname,
                "url_photo"    : results[0].dataValues.url_photo,
                "numNewStories": Math.floor(5 * Math.random()) + 1,
                "numStories"   : 6,
                "numWriters"   : Math.floor(90 * Math.random()) + 10,
                "numReaders"   : Math.floor(90 * Math.random()) + 10,
                stories
            };

            res.render("profile", {
                maiId,
                maiFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["index"],
                "editable"        : true,
                writer,
            });
        }

        // Do a nested join
        Writer.findAll({
            "where"     : {"id": maiId},
            "attributes": ["fullname", "url_photo"],
            "include"   : [
                {
                    "model"  : Story,
                    "include": [
                        {
                            "model"     : Photo,
                            "attributes": ["url"]
                        }
                    ]
                }
            ],
            "order"     : [
                [Story, "created_at", "DESC"],
                [Story, Photo, "created_at", "ASC"]
            ]

        }).then(callback);
    }
});


router.get("/logout", (req, res) => {
    const cookie = req.cookies;

    for (let value in cookie) {
        // Ignore prototype (inherited properties)
        if (cookie.hasOwnProperty(value)) {
            // Empty the value and change the expiration date to now
            res.cookie(value, "", {"expires": new Date(0)});
        }
    }
    
    res.redirect("/");
});


router.get("/profile_:id", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];

    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    } else {
        function callback(results) {
            const stories = [];

            for (let i = 0; i < results[0].Stories.length; i++) {
                stories.push({
                    "id"   : results[0].Stories[i].id,
                    "title": results[0].Stories[i].title,
                    "url"  : results[0].Stories[i].Photos[0].dataValues.url
                });
            }

            // TODO: Calculate the number of stories, writers, and readers based on queries
            const writer = {
                "fullname"     : results[0].dataValues.fullname,
                "url_photo"    : results[0].dataValues.url_photo,
                "numNewStories": Math.floor(5 * Math.random()) + 1,
                "numStories"   : 6,
                "numWriters"   : Math.floor(90 * Math.random()) + 10,
                "numReaders"   : Math.floor(90 * Math.random()) + 10,
                stories
            };

            res.render("profile", {
                maiId,
                maiFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["profile"],
                "editable"        : (req.params.id === maiId),
                writer
            });
        }

        Writer.findAll({
            "where"     : {"id": req.params.id},
            "attributes": ["fullname", "url_photo"],
            "include"   : [
                {
                    "model"  : Story,
                    "include": [
                        {
                            "model"     : Photo,
                            "attributes": ["url"]
                        }
                    ]
                }
            ],
            "order"     : [
                [Story, "created_at", "DESC"],
                [Story, Photo, "created_at", "ASC"]
            ]

        }).then(callback);

    }
});


router.get("/upload-photos", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];
    
    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    } else {
        // Must include dropzone before calling upload-photos.js
        res.render("upload-photos", {
            maiId,
            maiFullname,
            "customCSS"       : ["dropzone/dropzone", "style"],
            "customJavascript": ["dropzone/dropzone", "upload-photos"]
        });

    }
});


router.get("/create-story", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];
    
    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    } else {
        // TODO: Replace this array of photo URLs with the URLs from Amazon S3
        const photos = [
            {"url": "https://goo.gl/iyTKk9"}
        ];

        res.render("compose", {
            maiId,
            maiFullname,
            "customCSS"       : ["style"],
            "customJavascript": ["compose"],
            photos
        });

    }
});


router.get("/story_:id", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];
    
    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    } else {
        function callback(results) {
            const writer = {
                "id"      : results[0].Writer.dataValues.id,
                "fullname": results[0].Writer.dataValues.fullname
            };

            const photos = [];

            for (let i = 0; i < results[0].Photos.length; i++) {
                photos.push({
                    "url"    : results[0].Photos[i].url,
                    "caption": results[0].Photos[i].caption
                });
            }

            res.render("story", {
                maiId,
                maiFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["story"],
                "title"           : results[0].dataValues.title,
                writer,
                photos
            });
        }

        Story.findAll({
            "where"  : {"id": req.params.id},
            "include": [
                {
                    "model"     : Writer,
                    "attributes": ["id", "fullname"]
                },
                {
                    "model"     : Photo,
                    "attributes": ["url", "caption"]
                }
            ],
            "order"  : [
                [Photo, "created_at", "ASC"]
            ]

        }).then(callback);

    }
});


router.get("/edit-story_:maiId&:storyId", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];
    
    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    // Only the user can edit their stories
    } else if (req.params.maiId !== maiId) {
        res.redirect("/");

    } else {
        function callback(results) {
            const photos = [];

            for (let i = 0; i < results[0].Photos.length; i++) {
                photos.push({
                    "id"     : results[0].Photos[i].id,
                    "url"    : results[0].Photos[i].url,
                    "caption": results[0].Photos[i].caption
                });
            }

            const story = {
                "id"   : results[0].dataValues.id,
                "title": results[0].dataValues.title,
                photos
            };

            res.render("edit", {
                maiId,
                maiFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["edit"],
                story
            });
        }

        Story.findAll({
            "where"  : {"id": req.params.storyId},
            "include": [Photo],
            "order"  : [
                [Photo, "created_at", "ASC"]
            ]

        }).then(callback);
    }
});


router.get("/writers", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];
    
    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    } else {
        function callback(results) {
            const writers = [];

            for (let i = 0; i < results.length; i++) {
                writers.push({
                    "id"       : results[i].id,
                    "fullname" : results[i].dataValues.fullname,
                    "url_photo": results[i].dataValues.url_photo
                });
            }

            res.render("writers", {
                maiId,
                maiFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["writers"],
                writers
            });
        }

        Writer.findAll({}).then(callback);
    }
});


router.get("/settings", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];
    
    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    } else {
        function callback(results) {
            const writer = {
                "id"      : results[0].dataValues.id,
                "fullname": results[0].dataValues.fullname,
                "email"   : results[0].dataValues.email,
                "username": results[0].dataValues.username
            };

            res.render("settings", {
                maiId,
                maiFullname,
                "customCSS"       : ["style"],
                "customJavascript": ["settings"],
                writer
            });
        }

        Writer.findAll({
            "where": {"id": maiId}

        }).then(callback);
    }
});


router.get("/meet-mai", (req, res) => {
    res.render("meet-mai", {
        "maiId"           : req.cookies["maiId"],
        "maiFullname"     : req.cookies["maiFullname"],
        "customCSS"       : ["style"],
        "customJavascript": ["meet-mai"]
    });
});


router.get("/meet-mai-team", (req, res) => {
    res.render("meet-mai-team", {
        "maiId"           : req.cookies["maiId"],
        "maiFullname"     : req.cookies["maiFullname"],
        "customCSS"       : ["style"],
        "customJavascript": ["meet-mai-team"],
        maiTeam
    });
});


module.exports = router;