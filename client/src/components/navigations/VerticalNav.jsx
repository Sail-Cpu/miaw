import React, {useState} from "react";
import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../redux/auth/selector.js";
import {allAppsNoCatSelector} from "../../redux/app/selector.js";


const tabs = [
    {
        name: "Profile",
        icon: allIcons.app,
        extends: false
    },
    {
        name: "Settings",
        icon: allIcons.home,
        extends: false
    },
    {
        name: "Software",
        icon: allIcons.keyboard,
        extends: true
    },
    {
        name: "Classement",
        icon: allIcons.points,
        extends: false
    }
]

export const NavExtends = () => {
    const {shortcuts} = useSelector(currentUserSelector);
    const allApps = useSelector(allAppsNoCatSelector);

    const getAllApps = () => {
        let res = [];
        for(let i = 0; i < shortcuts.length; i++){
            for(let j = 0; j < allApps.length; j++){
                if(!res.includes(allApps[j]) && allApps[j].app_id === shortcuts[i].app_id){
                    res.push(allApps[j]);
                }
            }
        }
        return res;
    }

    return getAllApps().map((app, idx) => {
        return(
            <div key={idx}>{app.app_name}</div>
        )
    })
}




const VerticalNavTabs = () => {

    const [extend, setExtend] = useState(false);

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

    return tabs.map((tab, idx) => (
        <React.Fragment key={idx}>
            {!tab.extends ?
                <div className="vertical-nav-tab" style={borderStyle(idx)}>
                    <div className="vertical-nav-tab-content">
                        <Icon path={tab.icon} />
                        <span>{tab.name}</span>
                    </div>
                </div>
                :
                <div className="vertical-nav-tab" style={borderStyle(idx)}>
                    <div className="vertical-nav-tab-content" onClick={() => setExtend(!extend)}>
                        <Icon path={tab.icon} />
                        <span>{tab.name}</span>
                    </div>
                    {extend &&
                        <div className="vertical-nav-tab-extends-container">
                            <NavExtends />
                        </div>
                    }

                </div>
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