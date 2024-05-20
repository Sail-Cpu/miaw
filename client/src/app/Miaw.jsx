//Components
import SideBar from "../components/navigations/SideBar.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import HeaderNav from "../components/navigations/HeaderNav.jsx";
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../redux/auth/selector.js";
import {useEffect} from "react";

const Miaw = () => {

    const navigate = useNavigate();
    const isLoggedIn = useSelector(isLoggedInSelector);

    useEffect(() => {
        !isLoggedIn && navigate('/login')
    }, [])

    const navParams = {
        tabs: [
            {
                name: "User",
                link: "/user",
            },
        ],
        buttons: [
            {
                name: "Disconnect",
                background: true,
                action: () => disconnect()
            }
        ],
        theme: isLoggedIn,
        search: false
    }

    const disconnect = () => {
        localStorage.removeItem("persist:root");
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