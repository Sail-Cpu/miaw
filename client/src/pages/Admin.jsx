import VerticalNavTabs from "../components/navigations/UserNav.jsx";
import {Outlet} from "react-router-dom";
import allIcons from "../utils/allIcons.js";

const User = () => {

    const tabs = [
        {
            name: "Create software",
            icon: allIcons.app,
        },
        {
            name: "Update Software",
            icon: allIcons.keyboard,
        },
    ]

    return(
        <div className="admin-page-container">
            <VerticalNavTabs tabs={tabs}/>
            <div className="admin-page">
                <Outlet />
            </div>
        </div>
    )
}

export default User;