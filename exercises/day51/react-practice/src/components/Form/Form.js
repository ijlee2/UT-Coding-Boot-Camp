import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
    // Setting the component's initial state
    state = {
        "firstName": "",
        "lastName" : "",
        "password" : ""
    };

    handleInputChange = event => {
        // Getting the name and value of the input which triggered the change
        const {name, value} = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        const {firstName, lastName, password} = this.state;

        if (!firstName || !lastName) {
            alert("Please enter your first and last names.");

        } else if (password.length < 6) {
            alert(`Please choose a more secure password, ${firstName} ${lastName}.`);

        } else {
            // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
            alert(`Hello, ${firstName} ${lastName}!`);
            
            // Reset the input fields
            this.setState({
                "firstName": "",
                "lastName" : "",
                "password" : ""
            });

        }
    };

    render() {
        // Notice how each input has a `name`, `value`, and `onChange` prop
        return (
            <div>
                <p>Hello, {this.state.firstName} {this.state.lastName}!</p>
                
                <form className="form">
                    <input
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        placeholder="First Name"
                    />

                    <input
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        placeholder="Last Name"
                    />

                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        placeholder="Password"
                        maxLength="15"
                    />
                    
                    <button onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Form;