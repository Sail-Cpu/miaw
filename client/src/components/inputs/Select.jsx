import PropTypes from "prop-types";

const Select = (props) => {

    const {name, options, change} = props;

    return (
        <div className="form-input select-input">
            <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
            <select name={name}
                    placeholder="test"
                    onChange={change && ((e) => change(e))}
                    onFocus={(e) => e.currentTarget.classList.add("active")}
                    onBlur={(e) => e.currentTarget.classList.remove("active")}>
                {options &&
                    <>
                        <option value={0}>Select an option</option>
                        {
                            options.map((option, idx) => {
                                return(
                                    <option key={idx} value={option.id}>{option.name}</option>
                                )
                            })
                        }
                    </>
                }
            </select>
        </div>
    )
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    change: PropTypes.func
};
export default Select;