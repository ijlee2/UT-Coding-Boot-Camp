import React, { Component } from "react";

class Discover extends Component {
    state = {
        "numFriends": 3
    };

    render() {
        return (
            <div>
                <h1>Make New Friends</h1>
                <h2>Thumbs up on any pups you'd like to meet</h2>

                <p>
                    Nunc pharetra finibus est at efficitur. Praesent sed congue diam. Integer
                    gravida dui mauris, ut interdum nunc egestas sed. Aenean sed mollis diam.
                    Nunc aliquet risus ac finibus porta. Nam quis arcu non lectus tincidunt
                    fermentum. Suspendisse aliquet orci porta quam semper imperdiet. Praesent
                    euismod mi justo, faucibus scelerisque risus cursus in. Sed rhoncus mollis
                    diam, sit amet facilisis lectus blandit at.
                </p>

                <p>Made friends with {this.state.numFriends} pups so far!</p>
            </div>
        );
    }
}

export default Discover;