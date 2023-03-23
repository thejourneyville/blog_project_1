import { createContext, useState } from "react";

export const UpdateContext = createContext();

export const UpdateContextProvider = ({ children }) => {

    const [updateData, setUpdateData] = useState("");

    const populateEditor = (id, author, title, body) => {
        setUpdateData({
            id: id,
            author: author,
            title: title,
            body: body,
        });
        console.log("context: populated data for tiptap");
    };

    const updatePost = async (title, body) => {
        const response = await fetch(
            `http://localhost:4000/api/posts/${updateData.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    author: "Ben Malberg",
                    title,
                    body,
                }),
            }
        );
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setUpdateData("")
        }
    };

    const value = {
        populateEditor,
        updateData,
        setUpdateData,
        updatePost
    };

    return (
        <UpdateContext.Provider value={value}>
            {children}
        </UpdateContext.Provider>
    );
};
