//Components
import SideBar from "../components/navigations/SideBar.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../redux/auth/selector.js";
import {useEffect} from "react";
import Nav from "./Nav.jsx";

const Miaw = () => {

    const navigate = useNavigate();
    const isLoggedIn = useSelector(isLoggedInSelector);

    useEffect(() => {
        !isLoggedIn && navigate('/landing')
    }, [])

    return(
        <div className="miaw">
            <Nav isLoggedIn={isLoggedIn} />
            <SideBar />
            <div className="miaw-page">
                <div className="saas-page">
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}

export default Miaw;