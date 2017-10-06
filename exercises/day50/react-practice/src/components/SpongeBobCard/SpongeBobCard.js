import React from "react";
import "./SpongeBobCard.css";

const SpongeBobCard = () => (
  <div className="card">
    <div className="img-container">
      <img
        alt="SpongeBob"
        src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Spongebob-squarepants.svg/666px-Spongebob-squarepants.svg.png"
      />
    </div>
    <div className="content">
      <ul>
        <li>
          <strong>Name:</strong> SpongeBob
        </li>
        <li>
          <strong>Occupation:</strong> Fry Cook
        </li>
        <li>
          <strong>Location:</strong> A Pinapple Under the Sea
        </li>
      </ul>
    </div>
  </div>
);

export default SpongeBobCard;
