import PropTypes from "prop-types";

const Select = (props) => {

    const {name, options} = props;

    return (
        <div className="form-input select-input">
            <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
            <select name={name}
                    onFocus={(e) => e.currentTarget.classList.add("active")}
                    onBlur={(e) => e.currentTarget.classList.remove("active")}>
                {options &&
                    options.map((option, idx) => {
                        return(
                            <option key={idx} value={option}>{option}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
};
export default Select;