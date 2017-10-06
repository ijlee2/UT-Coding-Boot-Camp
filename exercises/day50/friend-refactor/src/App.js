import React from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";
import "./App.css";

class App extends React.Component {
    state = {friends};

    displayCards = () => this.state.friends.map(f =>
        <FriendCard name={f.name} image={f.image} occupation={f.occupation} location={f.location} key={f.id} id={f.id} removeCard={this.removeCard} />
    )

    removeCard = id => {
        this.setState({
            "friends": this.state.friends.filter(f => f.id !== id)
        });
    }

    render() {
        return (
            <Wrapper>
                <h1 className="title">Friends List</h1>

                {this.displayCards()}
            </Wrapper>
        );
    }
}

export default App;