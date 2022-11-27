import { Fragment } from "react";
import { Link } from "react-router-dom";

import CardInput from "./CardInput";


const AddCard = () => {
    const cardValue = {
        front: "",
        back: "",
        deckId: 1
    }    
    // add "cards/new" to url
    // use readDeck() to lead the deck that I'm adding the card to
    // add the deckId to the cardValue}

    // BUG: When adding a new card, it doesn't show on the ViewDeck page --> BECAUSE --> When adding a new card, it's added to the wrong deck
    // BUG: Cannot delete the new card that was created

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> DECK NAME HERE</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h4>DECK NAME HERE: Add Card</h4>
            <CardInput cardValue={cardValue} />
        </Fragment>
    )
}

export default AddCard;