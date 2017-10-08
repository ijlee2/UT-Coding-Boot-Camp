import React from "react";

const Query = (props) => {
    return (
        <div className="card grey lighten-5">
            <div className="card-content">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <h2 className="card-title">Search</h2>

                        <form className="nyt-query" onSubmit={props.handleSubmit}>
                            <div className="input-field">
                                <label htmlFor="nyt-topic" className="blue-grey-text text-darken-2">Topic</label>
                                <input type="text" name="topic" id="nyt-topic" value={props.topic} onChange={props.handleChange} className="validate" required />
                            </div>

                            <div className="input-field">
                                <label htmlFor="nyt-start-year" className="blue-grey-text text-darken-2">Start year</label>
                                <input type="text" name="startYear" id="nyt-start-year" value={props.startYear} onChange={props.handleChange} className="validate" required />
                            </div>

                            <div className="input-field">
                                <label htmlFor="nyt-end-year" className="blue-grey-text text-darken-2">End year</label>
                                <input type="text" name="endYear" id="nyt-end-year" value={props.endYear} onChange={props.handleChange} className="validate" required />
                            </div>

                            <div className="nyt-separator-2"></div>

                            <button type="submit" className="btn btn-large waves-light teal lighten-2" title="Click to search articles.">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Query;