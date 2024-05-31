import PropTypes from "prop-types";

const Unavailable = ({text}) => {
    return(
        <div className="unavailable-page">
            <h1>404</h1>
            <span>{text}</span>
        </div>
    )
}

Unavailable.propTypes = {
    text: PropTypes.string.isRequired
}

export default Unavailable;