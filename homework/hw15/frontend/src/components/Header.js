import React, { Component } from "react";
import moment from "moment";

import Time from "./Header/Time";

// Find out how many milliseconds remain until the next minute
const date  = new Date();
let ms_now  = 1000 * date.getSeconds() + date.getMilliseconds();
let ms_left = (ms_now > 0) ? 60000 - ms_now : 0;

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

        }, ms_left);
    }

    updateTime() {
        this.setState({
            "time": moment().format("LLL")
        });
    }

    render() {
        return (
            <header>
                <h1 className="center-align">New York Times</h1>
                <Time time={this.state.time} />
            </header>
        );
    }
}

export default Header;