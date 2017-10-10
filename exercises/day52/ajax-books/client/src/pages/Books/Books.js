import React, { Component } from "react";

import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
    // Initialize state
    state = {
        "title"   : "",
        "author"  : "",
        "synopsis": "",
        "books"   : []
    };

    // Get all books from the database and save them to this.state.books
    componentDidMount() {
        API
            .getBooks()
            .then(res => {
                this.setState({
                    "books": res.data
                });

            })
            .catch(err => {
                console.error(err);

            });
    }

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();

        API
            .saveBook({
                "title"   : this.state.title,
                "author"  : this.state.author,
                "synopsis": this.state.synopsis
            })
            .then(res => {
                const {author, data, synopsis, title, _id} = res.data;

                this.setState({
                    "books": [...this.state.books, {author, data, synopsis, title, _id}]
                });

                console.log(this.state.books);

            })
            .catch(err => {
                console.error(err);

            });
    }

    deleteBook = id => {
        // Remove from the database
        API
            .deleteBook(id)
            .then(res => {
                this.setState({
                    "books": this.state.books.filter(b => b._id !== id)
                });

            })
            .catch(err => {
                console.error(err);

            })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>What Books Should I Read?</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                name="title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                placeholder="Title (required)"
                            />

                            <Input
                                name="author"
                                value={this.state.author}
                                onChange={this.handleInputChange}
                                placeholder="Author (required)"
                            />

                            <TextArea
                                name="synopsis"
                                onChange={this.handleInputChange}
                                placeholder="Synopsis (Optional)"
                            />

                            <FormBtn
                                disabled={!(this.state.author && this.state.title)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Book
                            </FormBtn>
                        </form>
                    </Col>

                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Books On My List</h1>
                        </Jumbotron>

                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem key={book._id}>
                                        <a href={"/books/" + book._id}>
                                            <strong>
                                                {book.title} by {book.author}
                                            </strong>
                                        </a>

                                        <DeleteBtn onClick={this.deleteBook.bind(null, book._id)} />
                                    </ListItem>
                                ))}
                            </List>

                        ) : (
                            <h3>No Results to Display</h3>

                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Books;