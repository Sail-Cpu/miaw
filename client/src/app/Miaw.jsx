//Components
import SideBar from "../components/navigations/SideBar.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import HeaderNav from "../components/navigations/HeaderNav.jsx";

const Miaw = () => {

    const navigate = useNavigate();

    const navParams = {
        tabs: [
            {
                name: "Settings",
                link: "#",
            },
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
                background: false,
                action: () => disconnect()
            }
        ],
        search: true
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