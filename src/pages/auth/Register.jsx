import { useState } from "react";
//Forms
import RegisterForm from "../../forms/auth/RegisterForm.jsx";
import ProfileForm from "../../forms/auth/ProfileForm.jsx";
import ConfigForm from "../../forms/auth/ConfigForm.jsx";
//ui
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    {title: "Register", info: "Set you email and password"},
    {title: "Profile", info: "Set a profile with username and picture"},
    {title: "Configuration", info: "Configure your space with os and color"},
  ];

const Register = () => {

    const [step, setStep] = useState(0);

    return(
        <div className="sign-page register-page">
            {step === 0 && <RegisterForm setStep={() => setStep(1)} />}
            {step === 1 && <ProfileForm setStep={() => setStep(2)} />}
            {step >= 2 && <ConfigForm setStep={() => setStep(3)} />}
            <div className="sign-step-container">
                <Stepper activeStep={step} alternativeLabel>
                    {
                        steps.map((step, idx) => (
                            <Step style={{textAlign: "center"}} key={idx}>
                                <StepLabel style={{color: "#1F2937"}}>{step.title}</StepLabel>
                                <p>{step.info}</p>
                            </Step>
                        )
                    )}
                </Stepper> 
            </div>
        </div>
    )
}

export default Register;