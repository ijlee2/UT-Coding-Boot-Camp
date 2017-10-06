import React from "react";
import "./MrKrabsCard.css";

const MrKrabsCard = () => (
  <div className="card">
    <div className="img-container">
      <img
        alt="Mr. Krabs"
        src="https://vignette3.wikia.nocookie.net/vsbattles/images/8/80/Mr._Krabs.png/revision/latest?cb=20150919162131"
      />
    </div>
    <div className="content">
      <ul>
        <li>
          <strong>Name:</strong> Mr. Krabs
        </li>
        <li>
          <strong>Occupation:</strong> Restaurant Owner
        </li>
        <li>
          <strong>Location:</strong> A Giant Anchor
        </li>
      </ul>
    </div>
  </div>
);

export default MrKrabsCard;
