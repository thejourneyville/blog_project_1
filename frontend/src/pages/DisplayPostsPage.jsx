import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { useContext } from 'react';
import { UpdateContext } from "../context/UpdateContext";
import { FetchContext } from "../context/FetchContext";

const DisplayPostsPage = () => {

    const { posts, setTrigger } = useContext(FetchContext);
    const { updateData } = useContext(UpdateContext);

    useEffect(() => {
        
        if (posts !== updateData ) {
            setTrigger(prev => !prev)
        }
    }, [updateData]);

    return (
        <div className={"posts postsUser"}>
            {posts &&
                posts.map((post) => (
                    <PostCard
                        key={post._id}
                        id={post._id}
                        author={post.author}
                        timeStamp={post.createdAt}
                        updatedAt={post.updatedAt}
                        title={post.title}
                        body={post.body}
                        admin={false}
                    />
                ))}
        </div>
    );
};

export default DisplayPostsPage;
