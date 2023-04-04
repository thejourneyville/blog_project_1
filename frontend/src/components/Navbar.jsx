import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/posts">
                    <h5>posts</h5>
                </Link>
                <Link to="/post-entry">
                    <h5>post entry</h5>
                </Link>
                <Link to="/login">
                    <h5>Login</h5>
                </Link>
                <Link to="/signup">
                    <h5>Signup</h5>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;