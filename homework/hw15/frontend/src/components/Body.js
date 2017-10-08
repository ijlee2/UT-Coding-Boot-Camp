import React, { Component } from "react";
import axios from "axios";
import openSocket from "socket.io-client";

import Search from "./Body/Search";
import Saved  from "./Body/Saved";

const socket = openSocket("/");

class Body extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "topic"        : "Dogs",
            "startYear"    : 2017,
            "endYear"      : 2017,
            "articles"     : [],
            "articlesSaved": []
        }

        // Methods for Search component
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // Methods for Saved component
        this.handleSave   = this.handleSave.bind(this);
        this.handleUnsave = this.handleUnsave.bind(this);
        
        // Listen to broadcasts by other users
        socket.on("alertEveryoneElse", message => {
            alert(message);
        });
    }

    componentDidMount() {
        // Find saved articles
        axios
            .get("/api/saved")
            .then(response => {
                this.setState({
                    "articlesSaved": response.data
                });

            })
            .catch(error => {
                console.error(`Error in retrieving saved article:\n${error}`);

            });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const params = {
            "api-key"   : "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
            "q"         : this.state.topic,
            "begin_date": `${this.state.startYear}0101`,
            "end_date"  : `${this.state.endYear}1231`
        };

        // Find articles
        axios
            .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?", {params})
            .then(response => {
                const articles = response.data.response.docs.map(a => ({
                    "id"       : a._id,
                    "title"    : a.headline.main,
                    "byline"   : (a.byline) ? a.byline.original : "Anonymous",
                    "summary"  : a.snippet,
                    "url"      : a.web_url,
                    "category" : a.new_desk,
                    "date"     : a.pub_date,
                    "keywords" : a.keywords,
                    "wordCount": a.word_count
                }));

                this.setState({articles});

            })
            .catch(error => {
                console.error(error);

            });
    }

    handleSave(event) {
        event.preventDefault();

        const articleId = event.target.id.value;
        const article   = this.state.articles.find(a => a.id === articleId);

        axios
            .post("/api/saved", {article})
            .then(response => {
                if (response.status === 200) {
                    // Add the article to articlesSaved
                    this.setState({
                        "articlesSaved": [...this.state.articlesSaved, article]
                    });

                    // Broadcast the update
                    socket.emit("articleSaved", {"user": "Isaac", "title": article.title});
                }

            })
            .catch(error => {
                console.error(`Error in saving the article:\n${error}`);

            });
    }

    handleUnsave(event) {
        event.preventDefault();

        const id = event.target.id.value;
        
        // Override POST with DELETE
        axios
            .post("/api/saved?_method=DELETE", {id})
            .then(response => {
                // Remove the article from articlesSaved
                this.setState({
                    "articlesSaved": this.state.articlesSaved.filter(a => a.id !== id)
                });

            })
            .catch(error => {
                console.error(`Error in unsaving the article:\n${error}`);

            });
    }

    render() {
        return (
            <div className="body">
                <Search
                    topic={this.state.topic}
                    startYear={this.state.startYear}
                    endYear={this.state.endYear}
                    articles={this.state.articles}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleSave={this.handleSave}
                />

                <div className="nyt-separator-2" />

                <Saved
                    articlesSaved={this.state.articlesSaved}
                    handleUnsave={this.handleUnsave}
                />
            </div>
        );
    }
}

export default Body;