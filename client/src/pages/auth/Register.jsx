import { Outlet, useLocation } from "react-router-dom";
//ui
import { Toaster } from 'sonner'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useContext, useEffect, useMemo, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

const steps = [
    {title: "Register", info: "Set you email and password"},
    {title: "Profile", info: "Set a profile with username and picture"},
    {title: "Configuration", info: "Configure your space with os and color"},
  ];

const Register = () => {

    const {user} = useContext(AuthContext);

    const step = () => {
        return user.os.length > 0 ? 3 :
                user.username.length > 0 ? 2 :
                    user.email.length > 0 ? 1 : 0
    };

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
            <Toaster position="top-right" richColors closeButton />
        </div>
    )
}

export default Register;