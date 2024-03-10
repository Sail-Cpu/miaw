import PropTypes from "prop-types";
const Button = (props) => {
    const {name} = props;
    return <button className="submit-button" type="submit">{name}</button>
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
};


export default Button;