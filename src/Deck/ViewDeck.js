import { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

const ViewDeck = ({ cardList, currentDeck, getCurrentDeck, cardToDelete, deckToDelete }) => {
    const history = useHistory();
    const deckId = useParams().deckId;
    const { name, description } = currentDeck;

    const onDeckDeleteHandler = () => {
        deckToDelete(deckId);
        history.push("/");
    };

    useEffect( () => {
        const abort = new AbortController();
        const signal = abort.signal;
        
        getCurrentDeck(deckId, signal);

        return () => abort.abort();
    }, [currentDeck])

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{name}</li>
                </ol>
            </nav>
            <h4>{name}</h4>
            <p>{description}</p>
            <div className="d-flex justify-content-between mb-4">
                <div>
                    <button type="button" className="btn btn-secondary mr-2"><span className="oi oi-pencil"></span> Edit</button>
                    <button type="button" className="btn btn-primary mr-2"><span className="oi oi-book"></span> Study</button>
                    <button type="button" className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</button>
                </div>
                <button type="button" className="btn btn-danger" onClick={onDeckDeleteHandler}><span className="oi oi-trash"></span></button>
            </div>
            <h2>Cards</h2>
            {
                cardList.length 
                    ? cardList.map((card) => {
                        const { id, front, back } = card;
                        const onCardDeleteHandler = () => {
                            cardToDelete(id);
                        };

                        return (
                            <div className="card mb-2" key={id}>
                                <div className="card-body">
                                    <div className="row row-cols-2">
                                        <div className="col">
                                            <p>{front}</p>
                                        </div>
                                        <div className="col">
                                            <p>{back}</p>
                                        </div>
                                    </div>
                                    <div className="float-right">
                                        <button type="button" className="btn btn-secondary mr-2"><span className="oi oi-pencil"></span> Edit</button>
                                        <button type="button" className="btn btn-danger" onClick={onCardDeleteHandler}><span className="oi oi-trash"></span></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : (<p>Please create a card</p>)
            }
        </div>
    );
};

export default ViewDeck;