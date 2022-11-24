import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../Deck/CreateDeck";
import ListDeck from "../Deck/ListDeck";
import ViewDeck from "../Deck/ViewDeck";
import StudyDeck from "../Deck/StudyDeck";
// import EditDeck from "../Deck/EditDeck";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new"><CreateDeck /></Route>
          <Route path="/" exact><ListDeck /></Route>
          <Route path="/"><ViewDeck /></Route>
          <Route path="/decks/:deckId"><StudyDeck /></Route> 
          {/* <Route path="/decks/:deckId/edit"><EditDeck /></Route> */}
          <Route><NotFound /></Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
