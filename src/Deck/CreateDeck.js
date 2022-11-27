import { Fragment, useState } from 'react';
import { Link, useHistory } from'react-router-dom';
import { listDecks } from '../utils/api';

const CreateDeck = ({deckToCreate}) => {
    const history = useHistory();

    const [ deckName, setDeckName ] = useState("");
    const [ deckDescription, setDeckDescription ] = useState("");

    const onNameChange = (event) => setDeckName(event.target.value)
    const onDescChange = (event) => setDeckDescription(event.target.value)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        // QUESTION: Why doesn't this return the ID like it does in postman?
        await deckToCreate({name: deckName, description: deckDescription})
        // REVIEW: Get the ID directly from the response call and remove 2 next lines
        const newDeck = await listDecks();
        const currDeck = newDeck[newDeck.length - 1]
        
        setDeckName("");
        setDeckDescription("");

        history.push(`/decks/${currDeck.id}`);
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

            <h1>Create Deck</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Deck Name" 
                        onChange={onNameChange}
                        value={deckName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        rows="4" 
                        placeholder="Brief description of the deck"
                        onChange={onDescChange}
                        value={deckDescription}
                    ></textarea>
                </div>
                <div>
                    <Link to="/"><button className="btn btn-secondary mr-2">Cancel</button></Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </Fragment>
    )
}

export default CreateDeck;