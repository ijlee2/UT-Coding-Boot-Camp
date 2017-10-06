import React from "react";
import PanelBody from "./PanelBody";

class Counter extends React.Component {
    state = {
        "count": 0
    };

    handleIncrement = () => {
        this.setState({"count": this.state.count + 1});
    }

    handleDecrement = () => {
        this.setState({"count": this.state.count - 1});
    }

    handleTimesTwo = () => {
        this.setState({"count": 2 * this.state.count});
    }

    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">Click Counter!</div>
                <div className="panel-body text-center">
                    <p>Click Count (parent): {this.state.count}</p>

                    <PanelBody count={this.state.count} handleIncrement={this.handleIncrement} handleDecrement={this.handleDecrement} handleTimesTwo={this.handleTimesTwo}/>
                </div>
            </div>
        );
    }
}

export default Counter;