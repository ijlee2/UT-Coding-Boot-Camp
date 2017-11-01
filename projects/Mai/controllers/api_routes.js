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

// Import bcrypt
const bcrypt     = require("bcrypt");
const saltRounds = 12;

// Import Dropzone
const multer = require("multer");
const upload = multer({"dest": "uploads"});
const sizeOf = require("image-size");

// Cookie will expire in 1 week
const cookieOptions = {
    "expires" : new Date(Date.now() + 604800000),
    "httpOnly": (process.argv[2] !== "local"),
    "secure"  : (process.argv[2] !== "local")
};

// Import Google Cloud Vision
const vision = require("node-cloud-vision-api-comoc");
vision.init({"auth": "AIzaSyDac5vMeEApkYZaE09R4bFhAWxjJtwyQoU"});

// Talk to the models
const models = require(path.join(__dirname, "..", "models"));
const Writer = models.Writer;
const Story  = models.Story;
const Photo  = models.Photo;
const Reader = models.Reader;

// Default profile photos
const defaultPhotos = [
    "https://goo.gl/7g6AwU",
    "https://goo.gl/dFcx11",
    "https://goo.gl/myorst",
    "https://goo.gl/cnQGa7"
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

    Set up routes (related to accounts)

*****************************************************************************
*****************************************************************************/
router.post("/signup", (req, res) => {
    function callback(result) {
        res.cookie("maiId", result.id, cookieOptions);
        res.cookie("maiFullname", result.fullname, cookieOptions);
        res.redirect("/");
    }

    // Salt and hash the user's password
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
        Writer.create({
            "fullname" : req.body.fullname,
            "email"    : req.body.email,
            "username" : req.body.username,
            "hash"     : hash,
            "url_photo": defaultPhotos[Math.floor(defaultPhotos.length * Math.random())]

        }).then(callback);

    });
});


router.post("/login", (req, res) => {
    // Find the user's hash
    Writer.findAll({
        "attributes": ["id", "fullname", "hash"],
        "where"     : {"username": req.body.username}

    }).then(results => {
        // Compare hashes to verify the user
        bcrypt.compare(req.body.password, results[0].hash, (error, isMatch) => {
            if (isMatch) {
                if (!req.cookies.cookieName) {
                    res.cookie("maiId", results[0].id, cookieOptions);
                    res.cookie("maiFullname", results[0].fullname, cookieOptions);
                }

                res.redirect("/");

            // TODO: If the username or password does not match, display an error message
            } else {
                res.redirect("/");

            }
        });
    });
});


router.patch("/update-profile_:id", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];

    // Display homepage if the user is not logged in or does not have a valid cookie
    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    // Only the user can edit their profile
    } else if (req.params.id !== maiId) {
        res.redirect("/");

    } else {
        function callback(result) {
            // Update the fullname cookie
            res.cookie("maiFullname", req.body.fullname);
            res.redirect("/settings");
        }

        Writer.update({
            "fullname": req.body.fullname,
            "email"   : req.body.email,
            "username": req.body.username

        }, {
            "where": {"id" : req.params.id}

        }).then(callback);

    }
});


router.patch("/update-password_:id", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];

    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    // Only the user can edit their password
    } else if (req.params.id !== maiId) {
        res.redirect("/");

    } else {
        function callback(result) {
            res.redirect("/settings");
        }

        // Find the user's hash
        Writer.findAll({
            "attributes": ["hash"],
            "where"     : {"id": req.params.id}

        }).then(results => {
            // Verify the user
            bcrypt.compare(req.body.password_current, results[0].hash, (error, isMatch) => {
                if (isMatch) {
                    // Salt and hash the new password
                    bcrypt.hash(req.body.password_new, saltRounds, (error, hash) => {
                        Writer.update({hash}, {
                            "where": {"id": req.params.id}

                        });
                    });
                }
            });

        }).then(callback);

    }
});


router.delete("/delete-account_:id", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];

    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    // Only the user can delete their stories
    } else if (req.params.id !== maiId) {
        res.redirect("/");

    } else {
        function callback(results) {
            res.clearCookie("maiId");
            res.clearCookie("maiFullname");
            res.redirect("/");
        }

        Writer.destroy({
            "where": {"id": req.params.id}

        }).then(callback);

    }
});



/****************************************************************************
 ****************************************************************************

    Set up routes (related to stories)

*****************************************************************************
*****************************************************************************/
// TODO: Upload the photos to Amazon S3
// TODO: Use Google Vision
// TODO: Redirect the user to create-story page
router.post("/upload-photos", upload.single("file"), (req, res, next) => {
    if (!req.file.mimetype.startsWith("image/")) {
        return res.status(422).json({
            "error": "The uploaded file must be an image."
        });
    };

    const dimensions = sizeOf(req.file.path);

    if ((dimensions.width < 200) || (dimensions.height < 200)) {
        return res.status(422).json({
            "error": "The image must be at least 200 x 200px."
        });
    };

//    return res.status(200).send(req.file);
    // TODO: send user to "create-story" page along with photo URLs
    // res.redirect("/create-story");
    res.json(true);
    // next();
});


router.post("/create-story", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];

    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    } else {
        function callback(results) {
            res.redirect(`/story_${results[0].dataValues.story_id}`);
        }

        Story.create({
            "title"    : req.body.title,
            "writer_id": maiId

        }).then(result => {
            const photos = [];

            for (let i = 0; i < req.body.urls.length; i++) {
                photos.push({
                    "url"     : req.body.urls[i],
                    "caption" : req.body.captions[i],
                    "story_id": result.dataValues.id
                });
            }

            Photo.bulkCreate(photos).then(callback);
        });

    }
});


router.patch("/edit-story_:maiId&:storyId", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];

    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    // Only the user can edit their stories
    } else if (req.params.maiId !== maiId) {
        res.redirect("/");

    } else {
        function callback(results) {
            res.redirect(`/story_${req.params.storyId}`);
        }

        // Update the title
        Story.update({
            "title": req.body.title

        }, {
            "where": {"id": req.params.storyId}

        // Update the captions
        }).then(result => {
            function updateCaption(caption, i) {
                return Photo.update({caption}, {
                    "where": {"id": req.body.ids[i]}

                });
            }

            const updatesInParallel = req.body.captions.map(updateCaption);

            return Promise.all([updatesInParallel]);

        }).then(callback);

    }
});


router.delete("/delete-story_:maiId&:storyId", (req, res) => {
    const maiId       = req.cookies["maiId"];
    const maiFullname = req.cookies["maiFullname"];

    if (!isValidCookie(maiId)) {
        res.render("index", defaultValues);

    // Only the user can delete their stories
    } else if (req.params.maiId !== maiId) {
        res.redirect("/");

    } else {
        function callback(results) {
            res.redirect("/");
        }

        Story.destroy({
            "where": {"id": req.params.storyId}

        }).then(callback);

    }
});


// TODO: Change to POST
router.get("/vision", (req, res) => {
    const request = new vision.Request({
        "image": new vision.Image({
            "url": "http://www.ox.ac.uk/sites/files/oxford/styles/ow_medium_feature/public/field/field_image_main/friends_main.jpg?itok=Wmh9VQWO"
        }),

        "features": [
            new vision.Feature("FACE_DETECTION", 1)
        ]
    });

    vision.annotate(request).then(results => {
        res.send(results.responses);

    }, error => {
        console.log(`error: ${error}`);

    });
});


module.exports = router;