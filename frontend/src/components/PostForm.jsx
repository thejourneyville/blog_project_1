import React from "react";
import TipTap from "./TipTap";
import { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { FetchContext } from "../context/FetchContext";

const PostForm = () => {
    const [body, setBody] = useState("");
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const { updateData, setUpdateData, updatePost } = useContext(UpdateContext);
    const { setTrigger } = useContext(FetchContext);
    const [title, setTitle] = useState("");
    const [updateButton, setUpdateButton] = useState(false);

    useEffect(() => {
        updateData && setTitle(updateData.title);
        updateData && setUpdateButton(true);

        if (updateData.body !== body) {
            updateData && setBody(updateData.body);
        }
    }, [updateData]);

    const handleSubmit = async (e) => {
        console.log("submitted");
        setTrigger((prev) => !prev);
        setUpdateButton(false);
        setUpdateData("");

        const response = await fetch("http://localhost:4000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: "R2D2",
                title,
                body: body,
            }),
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            console.log("response OK");
            setTitle("");
            setSubmitted(true);
        }
    };

    const handleUpdate = () => {
        // fetchContext's state is altered here for refresh
        setTrigger((prev) => !prev);
        updatePost(title, body);
        // prop sent to tiptap which clears editor and sets to false
        setSubmitted(true);
        // hides button on form
        setUpdateButton(false);
        // clears title state
        setTitle("");
    };

    const handleCancel = () => {
        // prop sent to tiptap which clears editor and sets to false
        setSubmitted(true);
        // hides button on form
        setUpdateButton(false);
        // resets context state for update object
        setUpdateData("");
        // clears title state
        setTitle("");
    };

    return (
        <>
            <div className="createPost">
                <input
                    className="fieldInput"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="enter title"
                    required
                ></input>

                <TipTap
                    setBody={setBody}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                />
                <div className="formButtons">
                    {/* this condition states the following:
                    IF
                    1) local title state OR local body state does not equal context states
                    2) local body state is not null
                    3) local body state is not <p></p> 
                    (this happens when you manually delete 
                    everything in the tiptap editor) 
                    THEN activate the correct onClick event based on the boolean
                    state of updateButton which is set to true when UpdateContext's
                    updateData state is populated through UpdateContext's populateEditor function
                    from the TipTap component.
                    */}

                    {title &&
                        (title !== updateData.title ||
                            body !== updateData.body) &&
                        body !== "" &&
                        body !== "<p></p>" && (
                            <button
                                onClick={
                                    updateButton
                                        ? (e) => handleUpdate(e)
                                        : (e) => handleSubmit(e)
                                }
                                className={
                                    updateButton
                                        ? "updateSubmitButton"
                                        : "submitButton"
                                }
                            >
                                {updateButton ? "update" : "submit"}
                            </button>
                        )}
                    <button
                        onClick={handleCancel}
                        className={
                            updateButton ? "cancelButton" : "hiddenButton"
                        }
                    >
                        cancel update
                    </button>
                </div>
            </div>
        </>
    );
};

export default PostForm;
