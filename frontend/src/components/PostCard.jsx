import PropTypes from "prop-types";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parser from "html-react-parser";
import { useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { FetchContext } from "../context/FetchContext";

const PostCard = ({ id, author, timeStamp, updatedAt, title, body, admin }) => {
    const { populateEditor } = useContext(UpdateContext);
    const { setTrigger } = useContext(FetchContext);

    const handleUpdate = () => {
        populateEditor(id, author, title, body);
    };

    const handleRemove = async () => {
        const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
            method: "DELETE",
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            console.log("removed: ", json);
            setTrigger(prev => !prev);
        }
    };

    return (
        <div className="cardContainer">
            <div className="cardData">
                <h5 className="cardAuthor">{author}</h5>
                <p className="timeStamp">
                    created{" "}
                    {formatDistanceToNow(new Date(timeStamp), {
                        addSuffix: true,
                    })}
                </p>

                <div className="cardTitle">{title}</div>
                <div className="cardBody">{parser(body)}</div>
                {timeStamp !== updatedAt ? (
                    <div className="updatedTimeStamp">
                        updated{" "}
                        {formatDistanceToNow(new Date(updatedAt), {
                            addSuffix: true,
                        })}
                    </div>
                ) : null}
            </div>
            {admin && (
                <div className="buttons">
                    <button onClick={handleUpdate} className="updateButton">
                        update
                    </button>
                    <button onClick={handleRemove} className="removeButton">
                        remove
                    </button>
                </div>
            )}
        </div>
    );
};

PostCard.propTypes = {
    author: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

export default PostCard;
