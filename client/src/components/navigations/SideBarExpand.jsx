import PropTypes from "prop-types";
import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";
import ExpandTab from "./ExpandTab.jsx";
import {useSelector} from "react-redux";
import {allAppsSelector} from "../../redux/app/selector.js";
const SideBarExpand = (props) => {

    const allApps = useSelector(allAppsSelector);

    return(
        <div className="side-bar-expand-container" style={{left: props.toggle ? "115px" : ""}}>
            <div className="side-bar-expand-top">
                <h2>preline</h2>
                <div onClick={props.closeToggle}>
                    <Icon path={allIcons.close} />
                </div>
            </div>
            <div className="side-bar-expand-content" >
                {
                    allApps.map((category, idx) => {
                        return(
                            <ExpandTab key={idx} name={category.category.name} list={category.apps}/>
                            )
                    })
                }

            </div>
        </div>
    )
}

SideBarExpand.propTypes = {
    toggle: PropTypes.bool.isRequired,
    closeToggle: PropTypes.func
}

export default SideBarExpand;