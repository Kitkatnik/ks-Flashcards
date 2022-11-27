import { Fragment } from "react";
import { Link } from "react-router-dom";

import CardInput from "./CardInput";

// include "cards/:cardId/edit" in the URL
// use readDeck() to load the deck that contains the card to be edited
// pass through the existing card info to the CardInput component

// TODO: Show form that's already prefilled

const EditCard = () => {
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
                    <li className="breadcrumb-item active" aria-current="page">Edit Card CARDIDHERE</li>
                </ol>
            </nav>
            <h4>Edit Card</h4>
            {/* <CardInput /> */}
        </Fragment>
    )
}

export default EditCard;