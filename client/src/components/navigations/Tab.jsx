import PropTypes from "prop-types";
import Icon from "../Icon.jsx";

const Tab = (props) => {
    return(
        <div className="tab-container" onClick={props.toggle}>
            <Icon path={props.icon} />
        </div>
    )
}

Tab.propTypes = {
    icon: PropTypes.string.isRequired,
    toggle: PropTypes.func
};

export default Tab;