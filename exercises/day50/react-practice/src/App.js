import React      from "react";
import Wrapper    from "./components/Wrapper";
import Title      from "./components/Title";
import FriendCard from "./components/FriendCard";
import friends    from "./friends.json";

const friendCards = friends.map(f => 
    <FriendCard name={f.name} image={f.image} occpuation={f.occupation} location={f.location} key={f.id} />
);

const App = () => (
    <Wrapper>
        <Title>Friends List</Title>
        {friendCards}
    </Wrapper>
);

export default App;