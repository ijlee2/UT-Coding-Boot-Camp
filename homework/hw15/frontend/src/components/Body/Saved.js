import React from "react";

const Saved = (props) => {
    const articlesSaved = props.articlesSaved.map(a =>
        <div className="nyt-results hoverable" key={a.id}>
            <h3><a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a></h3>
            <span>{a.byline}</span>

            <form onSubmit={props.handleUnsave}>
                <input type="hidden" name="id" value={a.id} />
                <button type="submit" className="btn btn-large waves-light teal lighten-2" title="Click to unsave this article."><i className="material-icons">clear</i></button>
            </form>
        </div>
    );

    return (
        <div className="card">
            <div className="card-content">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <h2 className="card-title">Saved Articles</h2>

                        {articlesSaved}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Saved;