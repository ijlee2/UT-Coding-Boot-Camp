import React, { Component } from "react";
import moment from "moment";

import Time from "./Header/Time";

// Find out how many seconds remain until the next minute
let seconds = new Date().getSeconds;
let secondsRemaining = (seconds > 0) ? 1000 * (60 - seconds) : 0;

class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // Display the time
            "time": moment().format("LLL")
        }

        this.updateTime = this.updateTime.bind(this);

        // Update the time at the next minute
        setTimeout(() => {
            this.updateTime();

            // Afterwards, update the time every 1 minute
            setInterval(this.updateTime, 60000);

        }, secondsRemaining);
    }

    updateTime() {
        this.setState({
            "time": moment().format("LLL")
        });
    }

    render() {
        return (
            <header className="">
                <h1 className="center-align">New York Times</h1>
                <Time time={this.state.time} />
            </header>
        );
    }
}

export default Header;