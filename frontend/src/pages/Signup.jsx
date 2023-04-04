import { useState } from "react";

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userName, userPassword);
    };

    return (
        <div className="cardContainer loginContainer">
            <form onSubmit={handleSubmit}>
                <h5 className="cardAuthor">Sign Up</h5>
                <input
                className="loginFieldInput"
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    placeholder="enter your user name"
                    required
                />
                <div className="spacer"></div>
                <h5 className="cardAuthor">Password</h5>
                <input
                    className="loginFieldInput"
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                    placeholder="password"
                    required
                />
            </form>
            {userName && userPassword && (
                <button className="updateButton" onClick={handleSubmit}>
                    Sign Up
                </button>
            )}
        </div>
    );
};

export default Signup;
