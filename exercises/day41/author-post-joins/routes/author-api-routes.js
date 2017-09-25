const path = require("path");

// Requiring our models
const db     = require(path.join(__dirname, "..", "models"));
const Author = db.Author;
const Post   = db.Post;

module.exports = function(app) {
    app.get("/api/authors", function(req, res) {
        // 1. Add a join to include all of each Author's Posts
        db.Author.findAll({
            "include": [Post]

        }).then(function(dbAuthor) {
            res.json(dbAuthor);

        });
    });

    app.get("/api/authors/:id", function(req, res) {
        // 2. Add a join to include all of the Author's Posts here
        db.Author.findOne({
            "where"  : {"id": req.params.id},
            "include": [Post]

        }).then(function(dbAuthor) {
            res.json(dbAuthor);

        });
    });

    app.post("/api/authors", function(req, res) {
        db.Author.create(req.body).then(function(dbAuthor) {
            res.json(dbAuthor);
        });
    });

    app.delete("/api/authors/:id", function(req, res) {
        db.Author.destroy({
            "where": {"id": req.params.id}

        }).then(function(dbAuthor) {
            res.json(dbAuthor);

        });
    });
};