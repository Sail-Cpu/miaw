import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
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

    const location = useLocation();

    const step = () => {
        const path = location.pathname;
        switch(path){
            case "/sign":
                return 0;
            case "/sign/step2":
                return 1;
            case "/sign/step3":
                return 2;
            default:
                return 4;
        }
    }

    return(
        <div className="sign-page register-page">
            {<Outlet />}
            <div className="sign-step-container">
                <Stepper activeStep={step()} alternativeLabel>
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