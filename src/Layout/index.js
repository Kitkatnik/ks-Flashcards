import { 
  Fragment, 
  useState, 
  useEffect 
} from "react";
import { 
  Switch, 
  Route 
} from "react-router-dom";

import { 
  listDecks, 
  deleteDeck,
  createDeck,
  deleteCard,
  readDeck
} from "../utils/api/index";

import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../Deck/CreateDeck";
import ListDeck from "../Deck/ListDeck";
import ViewDeck from "../Deck/ViewDeck";
import StudyDeck from "../Deck/StudyDeck";
import EditDeck from "../Deck/EditDeck";


function Layout() {

  const [ deckList, setDeckList ] = useState([]);
  const [ currentDeck, setCurrentDeck ] = useState({});
  const [ cardList, setCardList ] = useState({});

  const deckToDelete = async (id) => {
    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
        await deleteDeck(id);
        deckToList();
    }
  }

  const cardToDelete = async (id) => {
    if(window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
      await deleteCard(id);
      getCurrentDeck();
  }
  }

  const deckToList = async (signal) => {
    try {
      const list = await listDecks(signal);
      setDeckList(list);
    } catch(error){
      console.log(error);
    }
  }

  const getCurrentDeck = async (id, signal) => {
    try{
        const list = await readDeck(id, signal);
        setCurrentDeck(list);
        setCardList(list.cards);
    } catch(error){
        console.log(error);
    }
}

  const deckToCreate = async (deck) => {
    try {
      await createDeck(deck);
      deckToList();
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect( () => {
    const abort = new AbortController();
    const signal = abort.signal;

    deckToList(signal);

    return () => abort.abort();
  }, [])

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <ListDeck deckList={deckList} deckToDelete={deckToDelete} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck deckToCreate={deckToCreate} />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route> 
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck 
              cardList={cardList}
              currentDeck={currentDeck} 
              getCurrentDeck={getCurrentDeck}
              cardToDelete={cardToDelete} 
              deckToDelete={deckToDelete}
            />
          </Route>
          <Route><NotFound /></Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
