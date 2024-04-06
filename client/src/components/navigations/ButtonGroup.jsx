import PropTypes from "prop-types";

const ButtonGroup = (props) => {

    const {labels, setSelected, selected} = props;

    const radius = (idx) => {
        if(idx === 0){
            return {borderTopLeftRadius: "6px",
                    borderBottomLeftRadius:"6px",
                    borderRight: 0
            };
        }else if(labels.length-1 === idx){
            return {borderTopRightRadius: "6px",
                    borderBottomRightRadius:"6px",
                    borderLeft: "2px solid #E5E7EB"
            };
        }
        return {borderRight: 0};
    }

    return(
        <div className="button-group-container">
            {
                labels.map((label, idx) => {
                    return(
                        <button
                            key={idx}
                            style={{
                                ...radius(idx),
                                backgroundColor: label.id === selected ? "#F8FAFC" : ""
                            }}
                            onClick={() => setSelected(label.id)}
                        >
                            {label.name}
                        </button>
                    )
                })
            }
        </div>
    )
}

ButtonGroup.propTypes = {
    labels: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired
}

export default ButtonGroup;