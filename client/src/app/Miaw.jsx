//Components
import SideBar from "../components/navigations/SideBar.jsx";
import {Outlet} from "react-router-dom";

const Miaw = () => {
    return(
        <div className="miaw">
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