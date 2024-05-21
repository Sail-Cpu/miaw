import React, {useContext, useMemo, useState} from "react";
import Icon from "../Icon.jsx";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../redux/auth/selector.js";
import {allAppsNoCatSelector} from "../../redux/app/selector.js";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {ThemeContext} from "../../context/ThemeContext.jsx";

const Tab = (props) => {
    const { tabs, tab, idx, extend, tag } = props;

    const [toggle, setToggle] = useState(false);

    const {theme, colors} = useContext(ThemeContext);

    const borderStyle = (idx) => {
        const borderType = `2px solid ${colors[theme].tabHover}`;
        const borderSize = "15px"
        const res = {
            borderLeft: borderType,
            borderRight: borderType
        };

        if (idx === 0 || idx === tabs.length - 1) {
            const cornerRadius = idx === 0 ?
                ['borderTop', 'borderTopLeftRadius', 'borderTopRightRadius'] :
                ['borderBottom', 'borderBottomLeftRadius', 'borderBottomRightRadius'];
            return {
                ...res,
                [cornerRadius[0]]: borderType,
                [cornerRadius[1]]: borderSize,
                [cornerRadius[2]]: borderSize,
                ...(idx % 2 !== 0 && { backgroundColor: colors[theme].tabHover })
            };
        }

        if (idx % 2 !== 0) {
            return {
                ...res,
                backgroundColor: colors[theme].tabHover
            };
        }

        return res;
    };

    return  <div className="vertical-nav-tab" style={borderStyle(idx)} onClick={() => setToggle(!toggle)}>
        <div className="vertical-nav-tab-content">
            <div>
                <Icon path={tab.icon} />
                <span>{tab.name}</span>
            </div>
            { tag > 0 && <div className="tag">{tag}</div> }
        </div>
        {toggle && extend}
    </div>
}

Tab.propTypes = {
    tab: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
    extend: PropTypes.element,
    action: PropTypes.func,
    tag: PropTypes.number,
    tabs: PropTypes.array
}

export const ShortcutsExtend = (props) => {
    const {tabs, tab, idx} = props;

    const allApps = useSelector(allAppsNoCatSelector);
    const {shortcuts} = useSelector(currentUserSelector);

    const getAllUserApps = () => {
        const userAppIds = shortcuts.map(shortcut => shortcut.app_id);
        const uniqueUserAppIds = Array.from(new Set(userAppIds));

        return allApps.filter(app => uniqueUserAppIds.includes(app.app_id));
    }

    const allUserApp = useMemo(() => getAllUserApps(), [allApps, shortcuts]);

    return shortcuts.length > 0 ?
        <Tab tabs={tabs} tab={tab} idx={idx} tag={allUserApp.length} extend={
            <div className="vertical-nav-tab-extends-container">
                {
                    allUserApp.map((app, idx) => {
                        return(
                            <div key={idx}>
                                <Link to={`/user/software/${app.app_id}`}>
                                    <span>
                                        {app.app_name}
                                    </span>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        }/> : <Tab tabs={tabs} tab={tab} idx={idx} tag={allUserApp.length}/>
}

ShortcutsExtend.propTypes = {
    tab: PropTypes.object,
    idx: PropTypes.number,
    tabs: PropTypes.array
}

export const AdminExtend = (props) => {

    const {tabs, tab, idx} = props

    return props.list.length > 0 ?
        <Tab tabs={tabs} tab={tab} idx={idx} tag={props.list.length} extend={
            <div className="vertical-nav-tab-extends-container">
                {
                    props.list.map((item, idx) => {
                        return(
                            <div key={idx}>
                                <Link to={`/admin/${item.link}`}>
                                    <span>
                                        {item.name}
                                    </span>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        }/> : <Tab tabs={props.tabs} tab={tab} idx={idx} tag={props.tabs.length}/>
}

AdminExtend.propTypes = {
    list: PropTypes.array,
    tabs: PropTypes.array,
    tab: PropTypes.object,
    idx: PropTypes.number
}



const UserNav = (props) => {
    return(
        <div className="vertical-nav-container">
            {
                props.tabs.map((tab, idx) => (
                    <React.Fragment key={idx}>
                        {tab?.extend ?
                            <>
                                {React.cloneElement(tab.extend, {tabs: props.tabs, tab: tab, idx: idx})}
                            </>
                            : <Tab tabs={props.tabs} tab={tab} idx={idx} />
                        }
                    </React.Fragment>
                ))
            }
        </div>
    )
}

UserNav.propTypes = {
    tabs: PropTypes.array.isRequired
}

export default UserNav;