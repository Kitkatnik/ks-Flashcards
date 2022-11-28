import { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from'react-router-dom';
import { readDeck } from '../utils/api';

const EditDeck = ({deckToUpdate}) => {
    const history = useHistory();
    const { deckId } = useParams();
    const { url } = useRouteMatch();

    const [ deckName, setDeckName ] = useState("");
    const [ deckDescription, setDeckDescription ] = useState("");

    const onNameChange = (event) => setDeckName(event.target.value)
    const onDescChange = (event) => setDeckDescription(event.target.value)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        await deckToUpdate({name: deckName, description: deckDescription})
        history.push(`/decks/${deckId}`);
    }
    
    const onCancelHandler = () => {
        history.goBack();
    }
    
    useEffect( () => {
        const abort = new AbortController();
        const signal = abort.signal;

        const readingDeck = async() => {
            const list = await readDeck(deckId, signal);
            await setDeckName(list.name)
            await setDeckDescription(list.description)
        }
        readingDeck();

        return () => abort.abort();
    }, [])

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={url}>{deckName}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
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
                    <button onClick={onCancelHandler} className="btn btn-secondary mr-2">Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </Fragment>
    )
}

export default EditDeck;