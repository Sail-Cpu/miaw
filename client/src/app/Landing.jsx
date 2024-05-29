//Components
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../redux/auth/selector.js";
import {useEffect} from "react";
import Nav from "./Nav.jsx";

const Landing = () => {

    const navigate = useNavigate();
    const isLoggedIn = useSelector(isLoggedInSelector);

    return(
        <div className="miaw">
            <Nav isLoggedIn={isLoggedIn} />
            <div className="miaw-page">
                <div className="landing-page">
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}

export default Landing;