import PropTypes from "prop-types";
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext.jsx";

const ButtonGroup = (props) => {

    const {labels, setSelected, selected} = props;

    const {theme, colors} = useContext(ThemeContext)

    const radius = (idx) => {
        if(idx === 0){
            return {borderTopLeftRadius: "6px",
                    borderBottomLeftRadius:"6px",
                    borderRight: 0
            };
        }else if(labels.length-1 === idx){
            return {borderTopRightRadius: "6px",
                    borderBottomRightRadius:"6px",
                    borderLeft: `2px solid ${colors[theme].tabHover}`
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
                                backgroundColor: label.id === selected ? colors[theme].tabHover : ""
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