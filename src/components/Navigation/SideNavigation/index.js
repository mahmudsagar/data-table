import React from "react";
import { Link } from "react-router-dom";
import './style.css'
const SideNavigation = () => {
    return (
        <aside className="sidebar navbar-expand-lg navbar-light">
            <div className="container">
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="#"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                Link
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default SideNavigation;
