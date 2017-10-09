import React from "react";

const Search = props => (
    <form>
        <input
            type="text"
            name="breedName"
            value={props.breedName}
            onChange={props.handleInputChange}
            placeholder="Enter a dog breed name"
        />
        
        <button onClick={props.handleFormSubmit}>Submit</button>
    </form>
);

export default Search;
