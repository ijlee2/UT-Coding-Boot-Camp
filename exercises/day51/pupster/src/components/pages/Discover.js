import React, { Component } from "react";
import axios from "axios";

class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "numFriends": 0,
            "friend"    : {}
        }

        this.findDog          = this.findDog.bind(this);
        this.handleThumbsDown = this.handleThumbsDown.bind(this);
        this.handleThumbsUp   = this.handleThumbsUp.bind(this);
    }

    findDog() {
        axios
            .get("https://dog.ceo/api/breeds/image/random")
            .then(res => {
                this.setState({
                    "friend": res.data.message
                });

            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.findDog();
    }

    handleThumbsDown() {
        // Find a new dog
        this.findDog();
    }

    handleThumbsUp() {
        // See if the dog likes you
        if (Math.floor(5 * Math.random()) === 0) {
            this.setState({
                "numFriends": this.state.numFriends + 1
            });
        }

        // Find a new dog
        this.findDog();
    }

    render() {
        return (
            <div>
                <h1>Make New Friends</h1>
                <h2>Thumbs up on any pups you'd like to meet</h2>

                <img src={this.state.friend} alt="myFriend" />
                <button onClick={this.handleThumbsDown}>Thumbs down</button>
                <button onClick={this.handleThumbsUp}>Thumbs up</button>

                <p>Made friends with {this.state.numFriends} pups so far!</p>
            </div>
        );
    }
}

export default Discover;