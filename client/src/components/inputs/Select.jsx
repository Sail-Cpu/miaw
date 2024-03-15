import PropTypes from "prop-types";

const jobs = [
    "developer",
    "designer",
    "video maker",
    "other"
]

const Select = (props) => {

    const {name} = props;

    return (
        <div className="form-input select-input">
            <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
            <select name={name}
                    onFocus={(e) => e.currentTarget.classList.add("active")}
                    onBlur={(e) => e.currentTarget.classList.remove("active")}>
                {
                    jobs.map((job, idx) => {
                        return(
                            <option key={idx} value={job}>{job}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

Select.propTypes = {
    name: PropTypes.string.isRequired
};
export default Select;