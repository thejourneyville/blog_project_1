import { useContext } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FetchContext } from "../context/FetchContext";

const PostEntryPage = () => {

    const { posts } = useContext(FetchContext);

    return (
        <div className="createEntryLayout">
            <div className="posts">
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
                            admin={true}
                        />
                    ))}
            </div>
            <PostForm />
        </div>
    );
};

export default PostEntryPage;
