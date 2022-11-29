import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck } from "../utils/api";

const StudyDeck = () => {
    const { deckId } = useParams();
    const history = useHistory();

    const [ deck, setDeck ] = useState({
        name: "",
        cards: []
    })
    const totalCards = deck.cards.length;

    const [ cardKeeper, setCardKeeper ] = useState({
        currentNum: 0,
        cardFlipped: false,
    });

    const [ currentCard, setCurrentCard ] = useState({
        front: "",
        back: ""
    })

    // Initial state
    useEffect( () => {
        const abort = new AbortController();
        const signal = abort.signal;
        
        const setDeckAndCards = async () => {
            await readDeck(deckId, signal)
                .then(data => {
                    setDeck(data)
                    return data;
                })
                .then(data => {
                    const card = data.cards[0]
                    setCurrentCard({front: card.front, back: card.back})
                })
;        }
        setDeckAndCards();

        return () => abort.abort();
    }, [deckId])

    // show the card
    const showCards = () => {
        if(totalCards < 3){
            return(
                <div>
                    <h4>Not enough cards.</h4>
                    <p>You need at least 3 cards to study. There are {totalCards} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`} role="button" className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</Link>
                </div>
            )
        } else {
            return(
                <div className="card mb-2">
                    <div className="card-body">
                    <h5 className="card-title">Card {cardKeeper.currentNum + 1} of {totalCards}</h5>
                        <p>
                            {
                                cardKeeper.cardFlipped
                                    ? currentCard.back
                                    : currentCard.front
                            }
                        </p>
                        {showButtons()}
                    </div>
                </div>
            )
        }
    }

    // turns card
    const flipCardHandler = () => {
        setCardKeeper({...cardKeeper, cardFlipped: !cardKeeper.cardFlipped})
    }

    const nextCardHandler = () => {

        if(cardKeeper.currentNum + 1 === totalCards){
            if(window.confirm("Restart cards?\n\nYClick 'cancel to return to the home page")){
                setCurrentCard({ front: deck.cards[0].front, back: deck.cards[0].back})
                setCardKeeper({currentNum: 0, cardFlipped: false})
            } else {
                history.push("/")
            }
        } else {
            setCurrentCard({ front: deck.cards[cardKeeper.currentNum + 1].front, back: deck.cards[cardKeeper.currentNum + 1].back})
            setCardKeeper({cardFlipped: !cardKeeper.cardFlipped, currentNum: cardKeeper.currentNum + 1})
        }
    }

    const showButtons = () => {
        if(cardKeeper.cardFlipped === false){
            return <button className="btn btn-secondary mr-2" onClick={flipCardHandler}>Flip</button>
        } else {
            return(
                <div>
                    <button className="btn btn-secondary mr-2" onClick={flipCardHandler}>Flip</button>
                    <button className="btn btn-primary" onClick={nextCardHandler}>Next</button>
                </div>
            )
        }
    }
    

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Study: {deck.name}</h2>
            {showCards()}
            <hr />
            <h3>This works</h3>
            <ol>
                <li><b>Current Number:</b> {cardKeeper.currentNum}</li>
                <li><b>Total Cards:</b> {totalCards}</li>
                <li><b>Current Card Front:</b> {`${currentCard.front}`}</li>
                <li><b>Current Card Back:</b> {`${currentCard.back}`}</li>
                <li><b>Card Flipped:</b> {cardKeeper.cardFlipped ? "yes" : "no"}</li>
            </ol>
        </div>
    )

    
//     const [ cardKeeper, setCardKeeper ] = useState({
//         currentNumber: 0,
//         numberOfCards: 0,
//         currentCard: {},
//         cardFlipped: false
//     })

//     const { name, cards } = deck;
//     const { currentNumber, numberOfCards, currentCard, cardFlipped } = cardKeeper;

//     // console.log(currentNumber, numberOfCards, currentCard, cardFlipped);

//     const showButtons = () => {
//         if(currentNumber === 0){
//             return <button className="btn btn-secondary mr-2">Flip</button>
//         }
//     }


//     const showSide = () => {
//         return cardFlipped
//             ? currentCard.back
//             : currentCard.front
//     }

//     const notEnoughCards = () => {
//         return (
//             <div>
//                 <h4>Not enough cards.</h4>
//                 <p>You need at least 3 cards to study. There are {numberOfCards} cards in this deck.</p>
//                 <Link to={`/decks/${deckId}/cards/new`} role="button" className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</Link>
//             </div>
//         )
//     }

//     const enoughCards = () => {
//         return (
//             <div className="card mb-2">
//                 <div className="card-body">
//                 <h5 className="card-title">Card {currentNumber + 1} of {numberOfCards}</h5>
//                     <p>{showSide()}</p>
//                     {showButtons()}
//                 </div>
//             </div>
//         )
//     }

//     const showCards = () => {
//         if(numberOfCards < 3){
//             return notEnoughCards();
//         } else {
//             return enoughCards();
//         }
//     }

//     const settingKeeper = () => {
//         setCardKeeper({
//             ...cardKeeper,
//             numberOfCards: cards.length,
//             currentCard: cards[currentNumber]
//         })
//     }
//     return (
//         <div>
//             <h2>Study: {name}</h2>
//             {showCards()}
//         </div>
//     )
}

export default StudyDeck;