import PropTypes from "prop-types";
const Button = (props) => {
    const {name, onClick} = props;
    return <button className="submit-button" onClick={onClick}>{name}</button>
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func
};


export default Button;