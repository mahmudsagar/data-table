import React, { useState } from "react";

import "./style.css";
import { Link } from "react-router-dom";

const TopNavigation = () => {
    const [showDropdown, setShowDropDown] = useState(false);
    const windowSize = window.screen.width
    // console.log(windowSize);
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container nav-body">
                <Link to="/" className="navbar-brand">
                    Navbar
                </Link>

                <div className="dropdown">
                    <div className="row">
                        <div className="col-8">
                            <button
                                className="rounded-pill bg-primary"
                                onClick={() => setShowDropDown(!showDropdown)}
                            >
                                <span>
                                    <img
                                        className="rounded-circle"
                                        src="https://via.placeholder.com/40"
                                        alt=""
                                    />
                                </span>
                                <span className="text">
                                    {
                                        JSON.parse(
                                            sessionStorage.getItem(
                                                "currentUser"
                                            )
                                        )?.name
                                    }
                                </span>
                            </button>
                        </div>
                        <div className="col-4">
                            <button
                                className="navbar-toggler ms-3"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                                onClick={()=> localStorage.setItem("showSidebar", "true")}
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>

                    <ul
                        className={`dropdown-menu ${showDropdown && "show"}`}
                        aria-labelledby="dropdownMenuLink"
                    >
                        <li onClick={() => setShowDropDown(!showDropdown)}>
                            <Link
                                to={`/users/${
                                    JSON.parse(
                                        sessionStorage.getItem("currentUser")
                                    )?.id
                                }`}
                                className="dropdown-item"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li
                            onClick={() => {
                                sessionStorage.clear();
                                localStorage.clear();
                                setShowDropDown(!showDropdown);
                            }}
                        >
                            <p className="dropdown-item">Logout</p>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default TopNavigation;
