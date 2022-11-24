import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";
import Card from "./Card";

const ListDeck = () => {
    const [ deckList, setDeckList ] = useState([]);

    const deckToList = async () => {
        const list = await listDecks();
        await setDeckList(list);
    }
    
    const deckToDelete = async (id) => {
        if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
            await deleteDeck(id);
            deckToList();
        }
    }

    useEffect( () => {
        deckToList();
    }, [])

    return (
        <React.Fragment>
            <Link to="/" role="button" className="btn btn-secondary mb-3">Create Deck</Link>
                {
                    deckList.length
                        ? deckList.map( (deck) => {
                            return (
                                <div className="card mb-2" key={deck.id}>
                                    <Card deck={deck} deckToDelete={deckToDelete} />
                                </div>
                            )})
                        : <p>Please create a deck.</p>
                }
        </React.Fragment>
    )
}

export default ListDeck;