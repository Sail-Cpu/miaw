import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";
import {useState} from "react";

const ExpandTab = () => {

    const [toggle, setToggle] = useState(false);

    return(
        <div className="expand-tab-container">
            <div className="expand-tab-title">
                <Icon path={allIcons.home} />
                <div className="toggle-container">
                    IDE
                    <div className="toggle-button" onClick={() => setToggle(!toggle)}>
                        <Icon path={allIcons.arrow} width="17" height="19"/>
                    </div>
                </div>
            </div>
            <div className="expand-tab-content-container">
                <div className="expand-tab-content">
                    <div className="expand-tab" style={{display: toggle ? "block" : "none"}}>
                        <div className="tab">
                            <span>Visual Studio Code</span>
                        </div>
                        <div className="tab">
                            <span>Intellij</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpandTab;