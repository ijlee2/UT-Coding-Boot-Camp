module.exports = function(app) {
    app.get("/", (req, res) => {
        console.log("open home.html");
//        res.sendFile(path.join(__dirname, "app/public/home.html"));
    });

    app.get("/survey", (req, res) => {
        console.log("open survey.html");
//        res.sendFile(path.join(__dirname, "app/public/survey.html"));
    });
}