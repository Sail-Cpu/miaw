import React, {useState} from "react";
import Key from "./Key.jsx";
import PropTypes from "prop-types";

const Shortcut = (props) => {

    const {
        shortcut_name,
        shortcut_desc,
        shortcut_keys,
        shortcut_mac_keys} = props.data;

    const [os , setOs] = useState("windows");

    const setShortcut = () => {
        const keys = os === "windows" ? shortcut_keys : shortcut_mac_keys;
        return keys.map((key, index) => (
            <React.Fragment key={index}>
                <Key name={key} />
                {index < keys.length - 1 && <span className="more">+</span>}
            </React.Fragment>
        ));
    };

    return(
        <div className="shortcut-container">
            <div className="shortcut-nav">
                <div className="tab" onClick={() => setOs("windows")} style={{borderRight: "1px solid #E5E7EB"}}>
                    Windows / Linux
                </div>
                <div className="tab" onClick={() => setOs("mac")} style={{borderLeft: "1px solid #E5E7EB"}}>
                    Mac OS
                </div>
                <div className="tab-bottom-bar"
                     style={{left: os==="windows" ? "0" : "50%"}}>
                </div>
            </div>
            <div className="shortcut-content">
                <h3>{shortcut_name}</h3>
                <p>{shortcut_desc}</p>
                <div className="all-keys-container">
                    {setShortcut()}
                </div>
            </div>
        </div>
    )
}

Shortcut.propTypes = {
    data: PropTypes.object.isRequired
};

export default Shortcut;