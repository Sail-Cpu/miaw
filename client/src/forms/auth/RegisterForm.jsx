import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
//ui
import { toast } from 'sonner';
//Hooks
import usePasswordStrength from "../../hooks/usePasswordStrength.jsx";
//Components
import Input from '../../components/inputs/Input.jsx';
import PassProgress from '../../components/inputs/PassProgress.jsx';
import Button from '../../components/inputs/Button.jsx';
//Context
import {AuthContext} from "../../context/AuthContext.jsx";
//request
import {userExist} from "../../requests/auth.js";

const RegisterForm = () => {

    const navigate = useNavigate();
    const {setUser, user} = useContext(AuthContext)
    const [password, setPassword] = useState("");

    const passwordStrength = usePasswordStrength(password);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const confirmPassword = formData.get("confirm password");
        if(!email.length > 0 || !password.length > 0 || !confirmPassword.length > 0){
            toast.error('all fields must be completed');
            return;
        }
        if(await userExist({email: email}) === true){
            toast.error('email is already in use');
            return;
        }
        if(passwordStrength === 5){
            if(password !== confirmPassword){
                toast.error('passwords do not match');
                return;
            }
            setUser({
                ...user,
                email: email,
                password: password
            });
            navigate("/sign/step2");
        }else{
            toast.error('the password is not strong enough');
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
                <div>
                    <span>You already have an account <Link to='/login'>Login</Link></span>
                </div>
            </form>
    )
}

RegisterForm.propTypes = {
    setStep: PropTypes.func
};

export default RegisterForm;