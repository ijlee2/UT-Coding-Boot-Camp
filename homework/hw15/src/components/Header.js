import React, { Component } from "react";
import moment from "moment";

import Time from "./Time";

let initial = 1000 * (60 - new Date().getSeconds());

class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            "time": moment().format("LLL")
        }

        this.updateTime = this.updateTime.bind(this);

        setTimeout(() => {
            // Display the time
            this.updateTime();

            // Update the time every 1 minute
            setInterval(this.updateTime, 60000);

        }, initial);
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