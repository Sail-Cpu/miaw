import Logo from "../../assets/logo.png";
import Icons from "../../utils/allIcons.js";
import Tab from "./Tab.jsx";
import Icon from "../Icon.jsx";
import SideBarExpand from "./SideBarExpand.jsx";
import {useState} from "react";

const SideBar = () => {

    const [toggleExpand, setToggleExpand] = useState(false);

    return(
        <div className="side-bar-container">
            <div className="small-side-bar">
                <img className="side-bar-logo" src={Logo} alt="logo" />
                <Tab icon={Icons.home} />
                <Icon path={Icons.points} />
                <Tab icon={Icons.app} toggle={() => setToggleExpand(!toggleExpand)}/>
                <Tab icon={Icons.keyboard} />
            </div>
            <SideBarExpand toggle={toggleExpand} closeToggle={() => setToggleExpand(false)}/>
        </div>
    )
}

export default SideBar;