import VerticalNav from "../components/navigations/VerticalNav.jsx";
import {Outlet} from "react-router-dom";

const User = () => {
    return(
        <div className="user-page-container">
            <VerticalNav />
            <div className="user-page">
                <Outlet />
            </div>
        </div>
    )
}

export default User;