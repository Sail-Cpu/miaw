import PropTypes from "prop-types";
const SubmitButton = (props) => {
    const {name, onClick} = props;
    return <button className="submit-button" onClick={onClick}>{name}</button>
}

SubmitButton.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func
};


export default SubmitButton;