import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
//Components
import OS from '../../pages/components/inputs/OS';
import Button from '../../pages/components/inputs/Button';

const ConfigForm = (props) => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/sign")
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Configuration</h1>
            <div className="sign-page-form">
                <OS name="OS" />
            </div>
            <div className="button-container">
                <Button name="Submit"/>
            </div>
        </form>
    )
}

ConfigForm.propTypes = {
    setStep: PropTypes.func
};

export default ConfigForm;