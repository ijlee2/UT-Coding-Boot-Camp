import React, { Component } from "react";
import axios from "axios";

import Query from "./Query";
import Results from "./Results";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "topic"        : "Dogs",
            "startYear"    : 2017,
            "endYear"      : 2017,
            "articles"     : [],
            "articlesSaved": []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    render() {
        return [
            <Query 
                topic={this.state.topic}
                startYear={this.state.startYear}
                endYear={this.state.endYear}
                articles={this.state.articles}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />,
            
            <div className="nyt-separator-1" />,
            
            <Results articles={this.state.articles} />
        ];
    }
}

export default Search;