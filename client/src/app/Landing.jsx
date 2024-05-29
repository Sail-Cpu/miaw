//Components
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../redux/auth/selector.js";
import Nav from "./Nav.jsx";

const Landing = () => {

    const isLoggedIn = useSelector(isLoggedInSelector);

    return(
        <div className="miaw">
            <Nav isLoggedIn={isLoggedIn} />
            <div className="landing">
                {<Outlet />}
            </div>
        </div>
    )
}

export default Landing;