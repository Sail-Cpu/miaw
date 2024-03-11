import { useState } from 'react';
import PropTypes from 'prop-types';
//Hooks
import usePasswordStrength from "../../hooks/usePasswordStrength.jsx";
//Components
import Input from '../../pages/components/inputs/Input.jsx';
import PassProgress from '../../pages/components/inputs/PassProgress.jsx';
import Button from '../../pages/components/inputs/Button.jsx';

const RegisterForm = (props) => {

    const [password, setPassword] = useState("");
    const passwordStrength = usePasswordStrength(password);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setStep();
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Register</h1>
                <div className="sign-page-form">
                    <Input name="email" type="email" holder="you@email.com"/>
                    <Input
                        name="password"
                        type="password"
                        setState={setPassword}
                    />
                    <PassProgress strength={passwordStrength}/>
                    <Input name="confirm password" type="password" />
                </div>
                <div className="button-container">
                    <Button name="Submit" />
                </div>
            </form>
    )
}

RegisterForm.propTypes = {
    setStep: PropTypes.func
};

export default RegisterForm;