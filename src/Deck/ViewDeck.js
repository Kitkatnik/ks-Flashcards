import { useParams } from "react-router-dom";

const ViewDeck = () => {

    const deckId = useParams().deckId;
    return (
        <p>{`The deckId is ${deckId}`}</p>
    )
}

export default ViewDeck;