import React      from "react";
import Wrapper    from "./components/Wrapper";
import Title      from "./components/Title";
import FriendCard from "./components/FriendCard";
import friends    from "./friends.json";

const App = () => (
    <Wrapper>
        <Title>Friends List</Title>
        <FriendCard name="SpongeBob" occupation="Fry Cook" location="A Pinapple Under the Sea" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Spongebob-squarepants.svg/666px-Spongebob-squarepants.svg.png" />
        <FriendCard name="Mr. Krabs" occupation="Restaurant Owner" location="A Giant Anchor" src="https://vignette3.wikia.nocookie.net/vsbattles/images/8/80/Mr._Krabs.png/revision/latest?cb=20150919162131" />
        <FriendCard name="Squidward" occupation="Cashier" location="An Easter Island Head" src="https://vignette2.wikia.nocookie.net/fictionalcharacters/images/a/ac/Squidward.png/revision/latest?cb=20131121012626" />
    </Wrapper>
);

export default App;