import React from "react";

const Query = () => {
    return (
        <div className="card blue-grey lighten-5">
            <div className="card-content">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <h2 className="card-title">Search</h2>

                        <form action="/api/search" method="POST">
                            <div className="input-field">
                                <label htmlFor="nyt-topic" className="blue-grey-text text-darken-2">Topic</label>
                                <input type="text" name="topic" id="nyt-topic" className="validate" required />
                            </div>

                            <div className="input-field">
                                <label htmlFor="nyt-start-year" className="blue-grey-text text-darken-2">Start year</label>
                                <input type="text" name="start_year" id="nyt-start-year" className="validate" required />
                            </div>

                            <div className="input-field">
                                <label htmlFor="nyt-end-year" className="blue-grey-text text-darken-2">End year</label>
                                <input type="text" name="end_year" id="nyt-end-year" className="validate" required />
                            </div>

                            <div className="nyt-separator-2"></div>

                            <button type="submit" className="btn waves-light teal lighten-2" title="Click to search articles.">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Query;