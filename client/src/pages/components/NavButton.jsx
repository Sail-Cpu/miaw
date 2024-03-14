import PropTypes from "prop-types";
import {Link} from "react-router-dom";
const NavButton = (props) => {

    const {name, link, color} = props

    return(
        <Link to={link}>
            <button className="nav-button"
                    style={{borderColor: color, color: color}}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = color + "20"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ""}
                    >{name}</button>
        </Link>
    )
}

NavButton.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default NavButton;