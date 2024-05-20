import React, {useContext, useMemo, useState} from "react";
import Icon from "../Icon.jsx";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../redux/auth/selector.js";
import {allAppsNoCatSelector} from "../../redux/app/selector.js";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {ThemeContext} from "../../context/ThemeContext.jsx";

const Tab = (props) => {
    const { nb, tab, idx, extend, action, tag } = props;

    const {theme, colors} = useContext(ThemeContext);

    const borderStyle = (idx) => {
        const borderType = `2px solid ${colors[theme].tabHover}`;
        const borderSize = "15px"
        const res = {
            borderLeft: borderType,
            borderRight: borderType
        };

        if (idx === 0 || idx === nb - 1) {
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
    nb: PropTypes.number,
    tab: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
    extend: PropTypes.element,
    action: PropTypes.func,
    tag: PropTypes.number
}

const Extend = (props) => {
    return props.extend && props.condition ?
        <Tab nb={props.nb} tab={props.tab} idx={props.idx}  action={() => props.setExtend(false)} tag={props.list.length} extend={
            <div className="vertical-nav-tab-extends-container">
                {
                    props.list.map((app, idx) => {
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
        }/> : <Tab nb={props.nb} tab={props.tab} idx={props.idx} action={() => props.setExtend(true)} tag={props.list.length}/>
}

Extend.propTypes = {
    extend: PropTypes.bool.isRequired,
    condition: PropTypes.bool.isRequired,
    nb: PropTypes.number.isRequired,
    list: PropTypes.array.isRequired,
    tab: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
    setExtend: PropTypes.func.isRequired
}

export const ShortcutsExtend = (props) => {
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

    return <Extend
                extend={extend}
                condition={shortcuts.length > 0}
                nb={props.nb}
                idx={idx}
                setExtend={setExtend}
                list={allUserApp}
                tab={tab}

    />
}

ShortcutsExtend.propTypes = {
    tab: PropTypes.object,
    idx: PropTypes.number,
    nb: PropTypes.number
}

const VerticalNavTabs = (props) => {

    return(
        <div className="vertical-nav-container">
            {
                props.tabs.map((tab, idx) => (
                    <React.Fragment key={idx}>
                        {tab?.extend ?
                            <>
                                {React.cloneElement(tab.extend, {nb: props.tabs.length, tab: tab, idx: idx})}
                            </>
                            : <Tab nb={props.tabs.length} tab={tab} idx={idx} />
                        }
                    </React.Fragment>
            ))}
        </div>
    )
}

VerticalNavTabs.propTypes = {
    tabs: PropTypes.array,
}

export default VerticalNavTabs;