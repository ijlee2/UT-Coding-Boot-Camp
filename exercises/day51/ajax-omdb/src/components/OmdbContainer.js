import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Panel from "./Panel";
import Search from "./Search";
import MovieDetail from "./MovieDetail";
import API from "../utils/API";

class OmdbContainer extends Component {
    state = {
        "search": "",
        "result": {}
    };

    componentDidMount() {
        this.searchMovies("The Matrix");
    }

    searchMovies = query => {
        API
            .search(query)
            .then(res => this.setState({"result": res.data}))
            .catch(err => console.log(err));

    };

    renderMovie = () => {
        if (this.state.result.Title) {
            return (
                <Panel heading={this.state.result.Title}>
                    <MovieDetail
                        src={this.state.result.Poster}
                        director={this.state.result.Director}
                        genre={this.state.result.Genre}
                        released={this.state.result.Released}
                    />
                </Panel>
            );

        } else {
            return (
                <Panel heading="Search for a Movie to Begin">
                    <h3>No results to display</h3>
                </Panel>

            );

        }
    }

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });

    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchMovies(this.state.search);

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-8">
                        {this.renderMovie()}
                    </Col>

                    <Col size="md-4">
                        <Panel heading="Search">
                            <Search
                                value={this.state.search}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                            />
                        </Panel>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default OmdbContainer;