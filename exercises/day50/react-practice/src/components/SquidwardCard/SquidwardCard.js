import React from "react";
import "./SquidwardCard.css";

const SquidwardCard = () => (
  <div className="card">
    <div className="img-container">
      <img
        alt="Squidward"
        src="https://vignette2.wikia.nocookie.net/fictionalcharacters/images/a/ac/Squidward.png/revision/latest?cb=20131121012626"
      />
    </div>
    <div className="content">
      <ul>
        <li>
          <strong>Name:</strong> Squidward
        </li>
        <li>
          <strong>Occupation:</strong> Cashier
        </li>
        <li>
          <strong>Location:</strong> An Easter Island Head
        </li>
      </ul>
    </div>
  </div>
);

export default SquidwardCard;
