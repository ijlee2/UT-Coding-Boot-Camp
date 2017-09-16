/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const express = require("express");

// Create an instance of router
const router = express.Router();

// An array of objects
let friends = [];



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
// Display all friends
router.get("/friends", (req, res) => {
    res.json(friends);
});

// Find the best friend
router.post("/friends", (req, res) => {
    friends.push(req.body);

    res.send({
        "my_name"         : req.body.name,
        "friend_name"     : "John Doe",
        "friend_photo_url": "https://organicthemes.com/demo/profile/files/2012/12/profile_img.png"
    });
});

// Export the router
module.exports = router;