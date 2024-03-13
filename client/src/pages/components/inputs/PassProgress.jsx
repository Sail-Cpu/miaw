import PropTypes from "prop-types";

const PassProgress = (props) => {

    const strengthColor = () => {
        let res = [];
        for(let i = 1; i <= 5; i++){
            if(i <= props.strength){
                res.push(<div key={i} style={{backgroundColor: props.strength === 5 ? "#00BBA6" : "#2563EB"}}></div>);
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