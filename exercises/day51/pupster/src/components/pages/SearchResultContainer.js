import React, { Component } from "react";
import axios from "axios";

import Container   from "./Search/Container";
import Row         from "./Search/Row";
import Col         from "./Search/Col";
import Panel       from "./Search/Panel";
import Search      from "./Search/Search";

class SearchResultContainer extends Component {
    state = {
        "breedName": "",
        "result"   : []
    };

    searchDogs = query => {
        axios
            .get("https://dog.ceo/api/breed/hound/images")
            .then(res => {
                // Return the first 10 dogs
                this.setState({
                    "result": res.data.message.slice(0, 10)
                });

            })
            .catch(err => console.log(err));

    };

    displayDogs = () => {
        return this.state.result.map((url, index) =>
            <img className="responsive-img" src={`${url}`} key={index} alt={`dog{index}`}></img>
        );
    }

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });

    };

    handleFormSubmit = event => {
        event.preventDefault();

        console.log(this.state.breedName);

        this.searchDogs(this.state.breedName);

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Panel heading="Search">
                            <Search
                                breedName={this.state.breedName}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                            />
                        </Panel>
                    </Col>
                    <Col size="md-12">
                        {this.displayDogs()}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SearchResultContainer;