import VerticalNavTabs from "../components/navigations/UserNav.jsx";
import {Outlet} from "react-router-dom";
import allIcons from "../utils/allIcons.js";
import UserNav, {ShortcutsExtend} from "../components/navigations/UserNav";

const User = () => {

    const tabs = [
        {
            name: "Profile",
            icon: allIcons.app,
        },
        {
            name: "Software",
            icon: allIcons.keyboard,
            extend: <ShortcutsExtend />
        },
    ]

    return(
        <div className="user-page-container">
            <UserNav tabs={tabs}/>
            <div className="user-page">
                <Outlet />
            </div>
        </div>
    )
}

export default User;