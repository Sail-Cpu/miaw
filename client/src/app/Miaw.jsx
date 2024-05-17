//Components
import SideBar from "../components/navigations/SideBar.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import HeaderNav from "../components/navigations/HeaderNav.jsx";
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../redux/auth/selector.js";
import {useContext, useEffect} from "react";
import {ThemeContext} from "../context/ThemeContext.jsx";

const Miaw = () => {

    const navigate = useNavigate();
    const isLoggedIn = useSelector(isLoggedInSelector);

    const { toggleDarkTheme } = useContext(ThemeContext);

    useEffect(() => {
        !isLoggedIn && navigate('/login')
    }, [])

    const navParams = {
        tabs: [
            {
                name: "User",
                link: "/user",
            },
            {
                name: "Notification",
                link: "#",
            },
        ],
        buttons: [
            {
                name: "Disconnect",
                background: true,
                action: () => toggleDarkTheme()
            }
        ],
        search: false
    }

    const disconnect = () => {
        localStorage.clear();
        navigate("/login");
    }

    return(
        <div className="miaw">
            <HeaderNav params={navParams}/>
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