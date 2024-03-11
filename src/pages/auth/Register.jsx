import { useState } from "react";
//Components
import Input from "../components/inputs/Input.jsx";
import Button from "../components/inputs/Button.jsx";
import PassProgress from "../components/inputs/PassProgress.jsx";
import Select from "../components/inputs/Select.jsx";
import Upload from "../components/inputs/Upload.jsx";
import OS from "../components/inputs/OS.jsx";
//Forms
import RegisterForm from "../../forms/auth/RegisterForm.jsx";
import ProfileForm from "../../forms/auth/ProfileForm.jsx";
import ConfigForm from "../../forms/auth/ConfigForm.jsx";

const Register = () => {

    const [step, setStep] = useState(1);

    const changeStep = (e, step) => {
        e.preventDefault();
        setStep(step);
    }

    return(
        <div className="sign-page register-page">
            {step === 1 && <RegisterForm setStep={() => setStep(2)} />}
            {step === 2 && <ProfileForm setStep={() => setStep(3)} />}
            {step === 3 &&<ConfigForm />}
        </div>
    )
}

export default Register;