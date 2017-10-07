import React, { Component } from "react";

class Query extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "topic"    : "Hello",
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

        console.log(this.state);
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