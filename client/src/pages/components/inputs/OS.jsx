import PropTypes from 'prop-types';
//Icon
import linuxWindows from "../../../assets/linux_windows.svg";
import mac from "../../../assets/mac.svg";

const OS = (props) => {

    const {name} = props;

    return(
        <div className="form-input os-input">
            <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
            <div className="os-container">
                <div className="os-content">
                    <img src={linuxWindows} alt="os" />
                </div>
                <div className="bar"></div>
                <div className="os-content">
                    <img src={mac} alt="os" />
                </div>
            </div>
        </div>
    )
}

OS.propTypes = {
    name: PropTypes.string.isRequired
};

export default OS;