//Components
import SideBar from "../components/navigations/SideBar.jsx";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const Miaw = () => {

    const {allApps} = useSelector((state) => state.app);

    console.log(allApps)

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