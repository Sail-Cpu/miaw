import PropTypes from "prop-types";
import Button from "./Button.jsx";

const PassProgress = (props) => {

    const color = () => {
        if(props.strength === 4){
            return "#14B8A6"
        }else if(props.strength === 5){
            return "#00BBA6"
        }else{
            return "#2563EB"
        }
    }

    const strengthColor = () => {
        let res = [];
        for(let i = 1; i <= 5; i++){
            if(i <= props.strength){
                res.push(<div key={i} style={{backgroundColor: color()}}></div>);
            }else{
                res.push(<div key={i} style={{backgroundColor: "#E5E7EB"}}></div>);
            }
        }
        return res
    }

    return(
        <div className="pass-progress-container">
            {strengthColor()}
        </div>
    )
}

PassProgress.propTypes = {
    strength: PropTypes.number.isRequired,
};

export default PassProgress;