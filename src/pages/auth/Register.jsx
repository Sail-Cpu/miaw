import {useMemo, useState} from "react";
//Components
import Input from "../components/inputs/Input.jsx";
import Button from "../components/inputs/Button.jsx";
import PassProgress from "../components/inputs/PassProgress.jsx";
import usePasswordStrength from "../../hooks/usePasswordStrength.jsx";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const passwordStrength = usePasswordStrength(password);

    return(
        <div className="sign-page register-page">
            <form>
                <h1>Register</h1>
                <div className="sign-page-form">
                    <Input name="email" type="email" holder="you@email.com" setState={setEmail}/>
                    <Input
                        name="password"
                        type="password"
                        setState={setPassword}
                    />
                    <PassProgress strength={passwordStrength}/>
                    <Input name="confirm password" type="password" />
                </div>
                <div className="button-container">
                    <Button type="submit" name="Submit" />
                </div>
            </form>
        </div>
    )
}

export default Register;