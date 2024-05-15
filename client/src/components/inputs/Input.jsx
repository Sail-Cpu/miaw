import PropTypes from 'prop-types';

const Input = (props) => {
    const {name, type, holder, setState, value, wrong} = props;

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
                    style={{color: wrong ? "red" : "black"}}
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