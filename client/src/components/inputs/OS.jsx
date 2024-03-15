import PropTypes from 'prop-types';
//Icon
import linuxWindows from "../../assets/linux_windows.svg";
import mac from "../../assets/mac.svg";

const OS = (props) => {

    const {name, choice, setChoice} = props;

    return(
        <div className="form-input os-input">
            <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
            <div className="os-container">
                <div className="os-content"
                     style={{backgroundColor: choice==="windows" ? "#EFF6FF" : ""}}
                     onClick={() => setChoice("windows")}>
                    <img src={linuxWindows} alt="os" />
                </div>
                <div className="bar"></div>
                <div className="os-content"
                     style={{backgroundColor: choice === "mac" ? "#EFF6FF" : ""}}
                     onClick={() => setChoice("mac")}>
                    <img src={mac} alt="os" style={{width: "50px"}}/>
                </div>
            </div>
        </div>
    )
}

OS.propTypes = {
    name: PropTypes.string.isRequired,
    choice: PropTypes.string.isRequired,
    setChoice: PropTypes.func.isRequired
};

export default OS;