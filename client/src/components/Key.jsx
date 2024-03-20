import PropTypes from "prop-types";

const Key = (props) => {
    return(
        <div className="key-container">
            <span>{props.name}</span>
        </div>
    )
}

Key.propTypes = {
    name: PropTypes.string.isRequired
}

export default Key;