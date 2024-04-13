import React from "react";
import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";


const tabs = [
    {
        name: "Profile",
        icon: allIcons.app
    },
    {
        name: "Settings",
        icon: allIcons.home
    },
    {
        name: "Software",
        icon: allIcons.keyboard
    },
    {
        name: "Classement",
        icon: allIcons.points
    }
]




const VerticalNavTabs = () => {

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
            <div className="vertical-nav-tab" style={borderStyle(idx)}>
                <Icon path={tab.icon} />
                <span>{tab.name}</span>
            </div>
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