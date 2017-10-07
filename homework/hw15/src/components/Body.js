import React, { Component } from "react";
import axios from "axios";

import Search from "./Body/Search";
import Saved  from "./Body/Saved";

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
        this.handleRemove = this.handleRemove.bind(this);
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

        axios
            .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?", {params})
            .then(res => {
                const articles = res.data.response.docs.map(a => ({
                    "id"       : a._id,
                    "title"    : a.headline.main,
                    "byline"   : a.byline.original,
                    "summary"  : a.snippet,
                    "url"      : a.web_url,
                    "category" : a.new_desk,
                    "date"     : a.pub_date,
                    "keywords" : a.keywords,
                    "wordcount": a.word_count
                }));

                this.setState({"articles": articles});

            });
    }

    handleSave(event) {
        event.preventDefault();

        const articleId = event.target.id.value;
    }

    handleRemove(event) {
        event.preventDefault();

        const articleId = event.target.id.value;
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

                <div className="nyt-separator-1" />

                <Saved
                    articlesSaved={this.state.articlesSaved}
                    handleRemove={this.handleRemove}
                />
            </div>
        );
    }
}

export default Body;