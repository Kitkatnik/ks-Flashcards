import React, { useState } from 'react';
import { Link } from'react-router-dom';
import { createCard, readDeck } from '../utils/api';
import CardForm from "./CardForm";

const CreateCard = ({ deck, setDeck, url }) => {
    const { id, name } = deck;

    const [ newCard, setNewCard ] = useState({
        front: '',
        back: '',
    });

    const onChangeHandler = event => {
        setNewCard({
            ...newCard,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const createNewCard = await createCard(id, { front: newCard.front, back: newCard.back });
        const { deckId } = createNewCard;
        
        const setDeckAndCards = async () => readDeck(deckId).then(setDeck);
        setDeckAndCards();
        
        setNewCard({ front: "", back: "" });

        window.alert("Your card has been saved");
    }

    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={url}>{name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>

            <h3>{name}: Add Card</h3>
            <CardForm 
                card={newCard}
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onSubmitHandler}
                url={url}
                mode={"Create"}
            />
        </React.Fragment>
    )
}

export default CreateCard;