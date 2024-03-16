import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";
import ExpandTab from "./ExpandTab.jsx";
const SideBarExpand = () => {
    return(
        <div className="side-bar-expand-container">
            <div className="side-bar-expand-top">
                <h2>preline</h2>
                <Icon path={allIcons.close} />
            </div>
            <div className="side-bar-expand-content">
                <ExpandTab />
            </div>
        </div>
    )
}

export default SideBarExpand;