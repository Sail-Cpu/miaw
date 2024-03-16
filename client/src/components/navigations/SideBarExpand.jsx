import Icon from "../Icon.jsx";
import allIcons from "../../utils/allIcons.js";
import ExpandTab from "./ExpandTab.jsx";
import {useSelector} from "react-redux";
const SideBarExpand = () => {

    const { allApps } = useSelector(state => state.app)

    return(
        <div className="side-bar-expand-container">
            <div className="side-bar-expand-top">
                <h2>preline</h2>
                <Icon path={allIcons.close} />
            </div>
            <div className="side-bar-expand-content">
                {
                    allApps.map((category, idx) => {
                        return(
                            <ExpandTab key={idx} name={category.category.name} list={category.apps}/>
                            )
                    })
                }

            </div>
        </div>
    )
}

export default SideBarExpand;