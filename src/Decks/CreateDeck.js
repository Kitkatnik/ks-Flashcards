import { Fragment, useState } from 'react';
import { Link, useHistory } from'react-router-dom';
import { createDeck } from '../utils/api';
import DeckForm from './DeckForm';

const CreateDeck = () => {
    const history = useHistory();

    const [ newDeck, setNewDeck ] = useState({
        name: '',
        description: '',
    });

    const onChangeHandler = event => {
        setNewDeck({
            ...newDeck,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const createNewDeck = await createDeck({ name: newDeck.name, description: newDeck.description });
        
        setNewDeck({ name: "", description: "" });

        history.push(`/decks/${createNewDeck.id}`);
    }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>

            <h3>Create Deck</h3>
            <DeckForm 
                deck={newDeck} 
                onChangeHandler={onChangeHandler} 
                onSubmitHandler={onSubmitHandler} 
                url={`/`}
            />
        </Fragment>
    )
}

export default CreateDeck;