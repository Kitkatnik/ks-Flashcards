import { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

const CardInput = ({ cardValue }) =>{
    const { url } = useRouteMatch();
    const prevUrl = url.match(/\/[a-zA-Z]+\/\d+/gi);
    const deckId = url.match(/\d+/g);
    const history = useHistory();
    console.log(url);
    console.log(prevUrl);
    console.log(deckId);

    // SETTING STATES
    const [ card, setCard ] = useState(cardValue)
    const { front, back } = card;
    const [ frontCard, setFrontCard ] = useState(front);
    const [ backCard, setBackCard ] = useState(back);

    // CHECKING CARD VALUE
    const isEmpty = Object.values(cardValue).every(value => value !== "");

    // FORM INPUT CHANGES
    const onFrontChange = (event) => setFrontCard(event.target.value);
    const onBackChange = (event) => setBackCard(event.target.value);

    // FORM SUBMISSION
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (event.target.submitButton){
            await updateCard(deckId, {front: frontCard, back: backCard});
            history.push(`${prevUrl}`);
        } else {
            await createCard(deckId, {front: frontCard, back: backCard});
            setFrontCard("");
            setBackCard("");
            window.alert("Your card has been saved");
        }
    }

    // CANCEL OR DONE
    const onClickHandler = () => {
        setFrontCard("");
        setBackCard("");
        history.push(`${prevUrl}`);
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea 
                    rows="2" 
                    className="form-control" 
                    id="front" 
                    name="front" 
                    placeholder="Front side of card"
                    onChange={onFrontChange}
                    value={frontCard}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea 
                    rows="2" 
                    className="form-control" 
                    id="back" 
                    name="back" 
                    placeholder="Back side of card"
                    onChange={onBackChange}
                    value={backCard}
                ></textarea>
            </div>
            <button type="button" className="btn btn-secondary mr-2" onClick={onClickHandler}>
                {
                    isEmpty ? "Cancel" : "Done"
                }
            </button>
            {
                isEmpty 
                    ? <button type="submit" name="submitButton" className="btn btn-primary">Submit</button>
                    : <button type="submit" name="saveButton" className="btn btn-primary">Save</button>
            }
            
        </form>
    )
}

export default CardInput;