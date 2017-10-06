import React from "react";
import "./FriendCard.css";

const FriendCard = props => {
    function removeCard() {
        props.removeCard(props.id);
    }

    return (
        <div className="card">
            <div className="img-container">
                <img alt={props.name} src={props.image} />
            </div>

            <div className="content">
                <ul>
                    <li>
                        <strong>Name:</strong> {props.name}
                    </li>
                    <li>
                        <strong>Occupation:</strong> {props.occupation}
                    </li>
                    <li>
                        <strong>Address:</strong> {props.address}
                    </li>
                </ul>
            </div>
            <span className="remove" onClick={removeCard}>𝘅</span>
        </div>
    );
}

export default FriendCard;