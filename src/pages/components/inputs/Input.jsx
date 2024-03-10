import PropTypes from 'prop-types';

const Input = (props) => {
    const {name, type, holder} = props;
    return(
        <div className="text-input">
            <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
            <input
                className="text-inputs"
                name={name}
                type={type}
                placeholder={holder}
                onFocus={(e) => e.currentTarget.classList.add("active")}
                onBlur={(e) => e.currentTarget.classList.remove("active")}
            />
        </div>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    holder: PropTypes.string
};

export default Input;