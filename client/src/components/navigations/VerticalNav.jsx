import React, {useMemo, useState} from "react";
import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../redux/auth/selector.js";
import {allAppsNoCatSelector} from "../../redux/app/selector.js";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Tab = (props) => {
    const { tab, idx, extend, action, tag } = props;

    const borderStyle = (idx) => {
        const borderType = "2px solid #E5E7EB";
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
                ...(idx % 2 !== 0 && { backgroundColor: "#F3F4F6" })
            };
        }

        if (idx % 2 !== 0) {
            return {
                ...res,
                backgroundColor: "#F3F4F6"
            };
        }

        return res;
    };

    return  <div className="vertical-nav-tab" style={borderStyle(idx)} onClick={action}>
        <div className="vertical-nav-tab-content">
            <div>
                <Icon path={tab.icon} />
                <span>{tab.name}</span>
            </div>
            { tag > 0 && <div className="tag">{tag}</div> }
        </div>
        {extend}
    </div>
}

Tab.propTypes = {
    tab: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
    extend: PropTypes.element,
    action: PropTypes.func,
    tag: PropTypes.number
}

const ShortcutsExtend = (props) => {
    const {tab, idx} = props;
    const [extend, setExtend] = useState(false);

    const allApps = useSelector(allAppsNoCatSelector);
    const {shortcuts} = useSelector(currentUserSelector);

    const getAllUserApps = () => {
        const userAppIds = shortcuts.map(shortcut => shortcut.app_id);
        const uniqueUserAppIds = Array.from(new Set(userAppIds));

        return allApps.filter(app => uniqueUserAppIds.includes(app.app_id));
    }

    const allUserApp = useMemo(() => getAllUserApps(), [allApps, shortcuts]);

    return extend && shortcuts.length > 0 ?
        <Tab tab={tab} idx={idx}  action={() => setExtend(false)} tag={allUserApp.length} extend={
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
        }/> : <Tab tab={tab} idx={idx} action={() => setExtend(true)} tag={allUserApp.length}/>
}

ShortcutsExtend.propTypes = {
    tab: PropTypes.object,
    idx: PropTypes.number
}


const tabs = [
    {
        name: "Profile",
        icon: allIcons.app,
    },
    {
        name: "Settings",
        icon: allIcons.home,
    },
    {
        name: "Software",
        icon: allIcons.keyboard,
        extend: <ShortcutsExtend />
    },
    {
        name: "Classement",
        icon: allIcons.points,
    }
]

const VerticalNavTabs = () => {

    return tabs.map((tab, idx) => (
        <React.Fragment key={idx}>
            {tab?.extend ?
                <>
                    {React.cloneElement(tab.extend, {tab: tab, idx: idx})}
                </>
                : <Tab tab={tab} idx={idx} />
            }
        </React.Fragment>
    ));
}

const VerticalNav = () => {
    return(
        <div className="vertical-nav-container">
            <VerticalNavTabs />
        </div>
    )
}

export default VerticalNav;