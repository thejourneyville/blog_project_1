import { createContext, useState, useEffect } from "react";

export const FetchContext = createContext();

export const FetchContextProvider = ({ children }) => {

    const [posts, setPosts] = useState(null);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("http://localhost:4000/api/posts");
            const json = await response.json();

            if (response.ok) {
                setPosts(json);
                console.log("fetched all posts")
            }
        };
        fetchPosts();

        // Return a cleanup function to update the state when unmounting
        return () => setPosts(null);
    }, [trigger]);

    const value = {
        posts,
        setTrigger
    };

    return (
        <FetchContext.Provider value={value}>
            {children}
        </FetchContext.Provider>
    );
};