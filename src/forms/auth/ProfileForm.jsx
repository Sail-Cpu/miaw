import PropTypes from 'prop-types';
//Components
import Input from "../../pages/components/inputs/Input";
import Select from "../../pages/components/inputs/Select";
import Upload from "../../pages/components/inputs/Upload";
import Button from "../../pages/components/inputs/Button";
import { useNavigate } from 'react-router-dom';

const ProfileForm = (props) => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/sign/step3");
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Profile</h1>
            <div className="sign-page-form">
                <Input name="username" type="text" holder="walter_white"/>
                <Select name="jobs" />
                <Upload name="Picture profile" />
            </div>
            <div className="button-container">
                <Button name="Submit" />
            </div>
        </form>
    )
}

ProfileForm.propTypes = {
    setStep: PropTypes.func
};

export default ProfileForm;