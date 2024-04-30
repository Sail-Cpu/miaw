import PropTypes from "prop-types";
const Button = (props) => {

    const {name, onClick, color} = props

    return(
        <button className="nav-button"
                onClick={onClick}
                style={{borderColor: color, color: color}}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = color + "20"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ""}
        >{name}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired
}

export default Button;