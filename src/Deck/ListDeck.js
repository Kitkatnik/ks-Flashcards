import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import Card from "./Card";

const ListDeck = () => {
    const [ deckList, setDeckList ] = useState([]);

    useEffect( () => {
        const setDeck = async() => {
            const list = await listDecks();
            await setDeckList(list);
        }
        setDeck();
    }, [])

    return (
        <React.Fragment>
            <Link to="/" role="button" className="btn btn-secondary mb-3">Create Deck</Link>
                {
                    deckList.map( ({id, name, description}) => {
                        return (
                            <div className="card mb-2" key={id}>
                                <Card name={name} description={description} />
                            </div>
                        )
                    })
                }
        </React.Fragment>
    )
}

export default ListDeck;