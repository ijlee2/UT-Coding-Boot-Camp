module.exports = function(app) {
    // TODO: Display an array of friends
    app.get("/api/friends", (req, res) => {
        console.log("Displaying array of friends");
    });
    
    // TODO: Handle survey results
    app.post("/api/friends", (req, res) => {
        console.log("Handling survey results");
    });
}