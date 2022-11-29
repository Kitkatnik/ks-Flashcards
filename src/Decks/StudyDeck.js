import { useState } from "react";
import { Link } from "react-router-dom"

const StudyDeck = ({ deck, url }) => {
    const { name, cards } = deck;

    const showCards = () => {
        if(cards.length < 3){
            return notEnoughCards();
        }
    }

    const notEnoughCards = () => {
        return (
            <div>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link to={`${url}/cards/new`} role="button" className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</Link>
            </div>
        )
    }

    const [ cardCount, setCardCount ] = useState({
        numberOfCards: cards.length,
        currentNumber: 0,
    })

    const [ study, setStudy ] = useState({
        currentCard: cards[cardCount.currentNumber],
        cardFlipped: false
    })



    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={url}>{name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Study: {name}</h2>
            {showCards()}
        </div>
    )
}

export default StudyDeck;