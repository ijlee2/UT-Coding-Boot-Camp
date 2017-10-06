import React from "react";

const List = props => {
    const itemsPurchased = props.groceries.filter(item => item.purchased);

    return (
        <ul className="list-group">
            {itemsPurchased.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
    );
}

export default List;