import { useState } from "react";
//Components
import Input from "../components/inputs/Input.jsx";
import Button from "../components/inputs/Button.jsx";
import PassProgress from "../components/inputs/PassProgress.jsx";
import usePasswordStrength from "../../hooks/usePasswordStrength.jsx";
import Select from "../components/inputs/Select.jsx";
import Upload from "../components/inputs/Upload.jsx";

const Register = () => {

    const [step, setStep] = useState(1);

    const [password, setPassword] = useState("");

    const passwordStrength = usePasswordStrength(password);

    const changeStep = (e, step) => {
        e.preventDefault();
        setStep(step);
    }

    return(
        <div className="sign-page register-page">
            {step === 1 &&
                <form>
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
                        <Button name="Submit" onClick={(e) => changeStep(e, 2)}/>
                    </div>
                </form>
            }
            {step === 2 &&
                <form>
                    <h1>Profile</h1>
                    <div className="sign-page-form">
                        <Input name="username" type="text" holder="walter_white"/>
                        <Select name="jobs" />
                        <Upload name="Picture profile" />
                    </div>
                    <div className="button-container">
                        <Button name="Submit" onClick={(e) => changeStep(e, 3)}/>
                    </div>
                </form>
            }
        </div>
    )
}

export default Register;