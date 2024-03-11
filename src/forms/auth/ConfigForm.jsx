import PropTypes from 'prop-types';
//Components
import OS from '../../pages/components/inputs/OS';
import Button from '../../pages/components/inputs/Button';

const ConfigForm = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setStep(4)
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