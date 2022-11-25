import { Fragment, useState } from 'react';
import { Link,useHistory, useRouteMatch } from'react-router-dom';

const CreateDeck = ({deckToCreate}) => {
    const history = useHistory();

    const [ deckName, setDeckName ] = useState("");
    const [ deckDescription, setDeckDescription ] = useState("");

    const onNameChange = (event) => setDeckName(event.target.value)
    const onDescChange = (event) => setDeckDescription(event.target.value)

    const onSubmitHandler = (event) => {
        event.preventDefault();

        deckToCreate({name: deckName, description: deckDescription});

        setDeckName("");
        setDeckDescription("");
        console.log(history)
        console.log(useRouteMatch)
        // send them to /deck/:deckId 
    }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
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