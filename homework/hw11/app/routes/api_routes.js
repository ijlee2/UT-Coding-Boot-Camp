/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const express = require("express");
const path    = require("path");

const FriendFinder = require(path.join(__dirname, "..", "data", "friends.js"));
const friendFinder = new FriendFinder();

// Create an instance of router
const router = express.Router();



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
// Display all friends
router.get("/friends", (req, res) => {
    res.json(friendFinder.getFriends());
});

// Find best friend
router.post("/friends", (req, res) => {
    const profile = {
        "name"     : req.body.name,
        "photo_url": req.body.photo_url,
        "answers"  : req.body.answers.map(a => parseInt(a))
    };

    const friend  = friendFinder.findFriend(profile);

    // Add the user's profile to the database
    friendFinder.addFriend(profile);
    
    res.send({
        "my_name"         : profile.name,
        "friend_name"     : friend.name,
        "friend_photo_url": friend.photo_url
    });
});

// Export the router
module.exports = router;