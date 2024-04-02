import PropTypes from "prop-types";

const ButtonGroup = (props) => {

    const {labels} = props;

    const radius = (idx) => {
        if(idx === 0){
            return {borderTopLeftRadius: "6px",
                    borderBottomLeftRadius:"6px",
                    borderRight: "0"
            };
        }else if(labels.length-1 === idx){
            return {borderTopRightRadius: "6px",
                    borderBottomRightRadius:"6px",
                    borderLeft: "0"
            };
        }
    }

    return(
        <div className="button-group-container">
            {
                labels.map((label, idx) => {
                    return(
                        <button key={idx} style={radius(idx)}>{label}</button>
                    )
                })
            }
        </div>
    )
}

ButtonGroup.propTypes = {
    labels: PropTypes.array.isRequired,
}

export default ButtonGroup;