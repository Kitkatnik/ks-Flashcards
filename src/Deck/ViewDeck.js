import { useState, useEffect } from "react";
import { Link, Switch, Route, useParams, useHistory, useRouteMatch } from "react-router-dom";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";

const ViewDeck = ({ currentDeck, deckToRead, cardToDelete, deckToDelete }) => {
    const history = useHistory();
    const { url } = useRouteMatch();
    const { deckId } = useParams();
    const { name, description, cards } = currentDeck;

    const [ currentCards, setCurrentCards ] = useState([]);

    const onDeckDeleteHandler = () => {
        deckToDelete(deckId);
        history.push("/");
    };

    useEffect( () => {
        const abort = new AbortController();
        const signal = abort.signal;
        
        const setDeckAndCards = async () => {
            await deckToRead(deckId, signal);
            console.log(currentDeck);
            if(cards){
                setCurrentCards(cards);

                console.log(cards);
                console.log(currentCards);
            }
        }
        setDeckAndCards();

        return () => abort.abort();
    }, [])

    return (
        <Switch>
            <Route path={`${url}`} exact>
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
                            <Link to={`${url}/edit`} role="button" className="btn btn-secondary mr-2"><span className="oi oi-pencil"></span> Edit</Link>
                            <Link to={`${url}/study`} role="button" className="btn btn-primary mr-2"><span className="oi oi-book"></span> Study</Link>
                            <Link to={`${url}/cards/new`} role="button" className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</Link>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={onDeckDeleteHandler}><span className="oi oi-trash"></span></button>
                    </div>
                    <h2>Cards</h2>
                    {/* {
                        currentCards.length 
                            ? currentCards.map((card) => {
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
                                                <Link to={`${url}/cards/${id}/edit`} role="button" className="btn btn-secondary mr-2"><span className="oi oi-pencil"></span> Edit</Link>
                                                <button type="button" className="btn btn-danger" onClick={onCardDeleteHandler}><span className="oi oi-trash"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : (<p>Please create a card</p>)
                    } */}
                </div>

            </Route>
            <Route path={`${url}/cards/:cardId/edit`}><EditCard /></Route>
            <Route path={`${url}/cards/new`}><AddCard /></Route>
        </Switch>
    );
};

export default ViewDeck;