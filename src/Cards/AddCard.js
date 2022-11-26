import CardInput from "./CardInput";
const cardValue = {
    id: 1,
    front: "something here",
    back: "else here"
};

const AddCard = () => {
    return (
        <CardInput cardValue={cardValue} />
    )
}

export default AddCard;