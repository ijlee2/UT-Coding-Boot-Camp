import React, { Component } from "react";
import axios from "axios";

const apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&hl=true&q=`;

class Query extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "topic"    : "",
            "startYear": 2017,
            "endYear"  : 2017
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const url = `${apiUrl}${this.state.topic}&begin_date=${this.state.startYear}0101&end_date=${this.state.endYear}0101`;

        axios.get(url).then(res => {
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

            console.log(articles);

        });
    }

    render() {
        return (
            <div className="card blue-grey lighten-5">
                <div className="card-content">
                    <div className="row">
                        <div className="col s10 offset-s1">
                            <h2 className="card-title">Search</h2>

                            <form onSubmit={this.handleSubmit}>
                                <div className="input-field">
                                    <label htmlFor="nyt-topic" className="blue-grey-text text-darken-2">Topic</label>
                                    <input type="text" name="topic" id="nyt-topic" value={this.state.topic} onChange={this.handleChange} className="validate" required />
                                </div>

                                <div className="input-field">
                                    <label htmlFor="nyt-start-year" className="blue-grey-text text-darken-2">Start year</label>
                                    <input type="text" name="startYear" id="nyt-start-year" value={this.state.startYear} onChange={this.handleChange} className="validate" required />
                                </div>

                                <div className="input-field">
                                    <label htmlFor="nyt-end-year" className="blue-grey-text text-darken-2">End year</label>
                                    <input type="text" name="endYear" id="nyt-end-year" value={this.state.endYear} onChange={this.handleChange} className="validate" required />
                                </div>

                                <div className="nyt-separator-2"></div>

                                <input type="submit" className="btn waves-light teal lighten-2" title="Click to search articles." value="Search" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Query;