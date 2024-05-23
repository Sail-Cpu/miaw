import Logo from "../../assets/logo.png";
import Icons from "../../utils/allIcons.js";
import Icon from "../Icon.jsx";
import {useContext, useState} from "react";
import {useSelector} from "react-redux";
import {allAppsSelector} from "../../redux/app/selector.js";
import allIcons from "../../utils/allIcons.js";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import {ThemeContext} from "../../context/ThemeContext.jsx";
import {currentUserSelector} from "../../redux/auth/selector.js";

const Tab = (props) => {

    const { theme, colors } = useContext(ThemeContext);
    return(
        <div className="tab-container" onClick={props.toggle}>
            <Icon path={props.icon} color={colors[theme].text}/>
        </div>
    )
}

Tab.propTypes = {
    icon: PropTypes.string.isRequired,
    toggle: PropTypes.func
};


const ExpandTab = ({name, list}) => {

    const [toggle, setToggle] = useState(false);

    const { theme, colors } = useContext(ThemeContext);

    return(
        <div className="expand-tab-container">
            <div className="expand-tab-title" style={{color: toggle ? colors[theme].primary : colors[theme].text}}>
                <Icon path={allIcons.home} color={toggle ? colors[theme].primary : colors[theme].text} />
                <div className="toggle-container">
                    {name}
                    <div className="toggle-button" onClick={() => setToggle(!toggle)} style={{transform: toggle ? "rotate(180deg)" : ""}}>
                        <Icon path={allIcons.arrow} width="17" height="19" color={toggle ? colors[theme].primary : colors[theme].text}/>
                    </div>
                </div>
            </div>
            <div className="expand-tab-content-container">
                <div className="expand-tab-content">
                    <div className="expand-tab" style={{display: toggle ? "block" : "none"}}>
                        {
                            list.map((app, idx) => {
                                return(
                                    <Link key={idx}  to={`/software/${app.app_id}`}>
                                        <div className="tab">
                                            <span>{app.app_name}</span>
                                        </div>
                                    </Link>
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

const SideBarExpand = (props) => {

    const allApps = useSelector(allAppsSelector);
    const { theme, colors } = useContext(ThemeContext);

    return(
        <div className="side-bar-expand-container" style={{left: props.toggle ? "115px" : ""}}>
            <div className="side-bar-expand-top">
                <h2>Miaw</h2>
                <div onClick={props.closeToggle}>
                    <Icon path={allIcons.close} color={colors[theme].text}/>
                </div>
            </div>
            <div className="side-bar-expand-content" >
                {
                    allApps.map((category, idx) => {
                        return <ExpandTab
                                    key={idx}
                                    name={category.category.name}
                                    list={category.apps}/>
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

const SideBar = () => {

    const {role} = useSelector(currentUserSelector)
    const [toggleExpand, setToggleExpand] = useState(false);
    const navigate = useNavigate();

    const { theme, colors } = useContext(ThemeContext);

    return(
        <div className="side-bar-container">
            <div className="small-side-bar">
                <img className="side-bar-logo" src={Logo} alt="logo" />
                <Tab icon={Icons.home} toggle={() => navigate('/')}/>
                <Icon path={Icons.points} color={colors[theme].text}/>
                <Tab icon={Icons.app} toggle={() => setToggleExpand(!toggleExpand)}/>
                <Tab icon={Icons.keyboard} toggle={() => navigate('/speedtest')}/>
                {
                    role === "admin" &&
                        <Tab icon={Icons.pen} toggle={() => navigate('/admin')}/>
                }
            </div>
            <SideBarExpand toggle={toggleExpand} closeToggle={() => setToggleExpand(false)}/>
        </div>
    )
}

export default SideBar;