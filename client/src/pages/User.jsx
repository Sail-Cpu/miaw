import UserNav from "../components/navigations/UserNav.jsx";
import {Outlet} from "react-router-dom";

const User = () => {
    return(
        <div className="user-page-container">
            <UserNav />
            <div className="user-page">
                <Outlet />
            </div>
        </div>
    )
}

export default User;