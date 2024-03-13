import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//Hooks
import usePasswordStrength from "../../hooks/usePasswordStrength.jsx";
//Components
import Input from '../../pages/components/inputs/Input.jsx';
import PassProgress from '../../pages/components/inputs/PassProgress.jsx';
import Button from '../../pages/components/inputs/Button.jsx';
//Context
import {AuthContext} from "../../context/AuthContext.jsx";
//request
import {userExist} from "../../requests/auth.js";

const RegisterForm = () => {

    const navigate = useNavigate();
    const {setUser, user} = useContext(AuthContext)
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const passwordStrength = usePasswordStrength(password);

    console.log(error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if(await userExist({email: formData.get("email")}) === true){
            setError("user exist");
            return;
        }
        if(passwordStrength === 5 && password === formData.get("confirm password")){
            setUser({
                ...user,
                email: formData.get("email"),
                password: password
            })
            navigate("/sign/step2")
        }else{
            setError("password error");
        }

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