import { Link } from "react-router-dom";

const Card = ({ deck, deckToDelete }) => {
    const {id, name, description} = deck;

    const onDeleteHandler = () => {
        deckToDelete(id);
    }

    return(
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{name}</h5>
                    <small className="text-muted"># cards</small>
                </div>
                <p className="card-text text-muted">{description}</p>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to="/" role="button" className="btn btn-secondary card-link">View</Link>
                        <Link to="/" role="button" className="btn btn-primary card-link">Study</Link>
                    </div>
                    <button 
                        name="delete"
                        className="btn btn-danger card-link"
                        onClick={onDeleteHandler}
                    >
                        Delete
                    </button>
                </div>
            </div>
    )
}

export default Card;