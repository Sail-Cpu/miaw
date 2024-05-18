import React, {useContext, useState} from "react";
import Key from "./Key.jsx";
import PropTypes from "prop-types";
import {favAction} from "../redux/auth/action.js";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../redux/auth/selector.js";
import {ThemeContext} from "../context/ThemeContext.jsx";


export const Keys = (keys) => {
    return keys.map((key, index) => (
        <React.Fragment key={index}>
            <Key name={key} />
            {index < keys.length - 1 && <span className="more">+</span>}
        </React.Fragment>
    ));
};

const Shortcut = (props) => {

    const dispatch = useDispatch();
    const { user_id, shortcuts: userShortcuts } = useSelector(currentUserSelector);

    const {theme, colors} = useContext(ThemeContext);

    const {
        shortcut_id,
        shortcut_name,
        shortcut_desc,
        shortcut_keys,
        shortcut_mac_keys} = props.data;

    const favorite = async (shortcutId, add) => {
        await dispatch(favAction({userId: user_id, shortcutId, add}));
    }

    const alreadyAdded = (shortcut_id) => {
        let res = false;
        userShortcuts.map(row => {
            if(row.shortcut_id === shortcut_id){
                res = true;
            }
        })
        return res;
    }

    const [os , setOs] = useState("windows");

    return(
        <div className="shortcut-container">
            <div className="shortcut-nav">
                <div className="tab" onClick={() => setOs("windows")} style={{borderRight: `1px solid ${colors[theme].tabHover}`}}>
                    Windows / Linux
                </div>
                <div className="tab" onClick={() => setOs("mac")} style={{borderLeft: `1px solid ${colors[theme].tabHover}`}}>
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
                    <div className="keys">
                        {
                            os === "windows" ?
                                Keys(shortcut_keys)
                                :
                                Keys(shortcut_mac_keys)
                        }
                    </div>
                    <div>
                        {alreadyAdded(shortcut_id) ?
                            <span
                                style={{color: colors[theme].error, cursor: "pointer"}}
                                onClick={() => favorite(shortcut_id, "false")}>
                                Delete
                            </span>
                            :
                            <span
                                style={{color: colors[theme].primary, cursor: "pointer"}}
                                onClick={() => favorite(shortcut_id, "true")}>
                                Favorite
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Shortcut.propTypes = {
    data: PropTypes.object.isRequired
};

export default Shortcut;