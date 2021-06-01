import React, { useState } from "react";

const LoginUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );
            const json = await response.json();
            const result = await json.find((user) => user.email === email && user.username === username);
            if(result === undefined || result === null){
                setIsError(true)
                alert("Incorrect information")
            }else{
                sessionStorage.setItem("currentUser", JSON.stringify(result))
                setCurrentUser(sessionStorage.getItem("currentUser"))
                setIsLoggedIn(true)
                setIsError(false)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form className="row g-3">
                <div className="col-auto">
                    <label htmlFor="staticEmail2">Email</label>
                    <input
                        type="text"
                        className="form-control-plaintext"
                        id="staticEmail2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <label htmlFor="inputPassword2" className="visually-hidden">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword2"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button
                        type="submit"
                        className="btn btn-primary mb-3"
                        onClick={handleSubmit}
                    >
                        Confirm identity
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginUser;
