import PropTypes from 'prop-types';
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext.jsx";

const Input = (props) => {
    const {name, type, holder, setState, value, wrong} = props;

    const {theme, colors} = useContext(ThemeContext)

    return(
        <div className="form-input text-input">
            <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
            {!setState ?
                <input
                    className="text-inputs"
                    name={name}
                    type={type}
                    placeholder={holder}
                    onFocus={(e) => e.currentTarget.classList.add("active")}
                    onBlur={(e) => e.currentTarget.classList.remove("active")}
                    value={value && value}
                    onChange={(e) => e.target.value}
                    style={{color: wrong ? "red" : colors[theme].text}}
                />
                :
                <input
                    className="text-inputs"
                    name={name}
                    type={type}
                    placeholder={holder}
                    onFocus={(e) => e.currentTarget.classList.add("active")}
                    onBlur={(e) => e.currentTarget.classList.remove("active")}
                    onChange={(e) => setState(e.target.value)}
                />
            }
        </div>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    holder: PropTypes.string,
    setState: PropTypes.func,
    value: PropTypes.string,
    wrong: PropTypes.bool
};

export default Input;