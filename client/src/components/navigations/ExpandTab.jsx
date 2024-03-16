import Icon from "../Icon";
import allIcons from "../../utils/allIcons.js";
import {useState} from "react";
import PropTypes from "prop-types";

const ExpandTab = ({name, list}) => {

    const [toggle, setToggle] = useState(false);

    return(
        <div className="expand-tab-container">
            <div className="expand-tab-title" style={{color: toggle ? "#2563EB" : ""}}>
                <Icon path={allIcons.home} color={toggle ? "#2563EB" : "black"} />
                <div className="toggle-container">
                    {name}
                    <div className="toggle-button" onClick={() => setToggle(!toggle)} style={{transform: toggle ? "rotate(180deg)" : ""}}>
                        <Icon path={allIcons.arrow} width="17" height="19" color={toggle ? "#2563EB" : "black"}/>
                    </div>
                </div>
            </div>
            <div className="expand-tab-content-container">
                <div className="expand-tab-content">
                    <div className="expand-tab" style={{display: toggle ? "block" : "none"}}>
                        {
                            list.map((app, idx) => {
                                return(
                                    <div key={idx} className="tab">
                                        <span>{app.app_name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

ExpandTab.propTypes = {
    name: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
};

export default ExpandTab;