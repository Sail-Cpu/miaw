import {useEffect, useState} from "react";

const usePasswordStrength = (password) => {

    const [strength, setStrength] = useState(0);

    function passwordHasNumber(password) {
        return /\d/.test(password);
    }

    function passwordHasUpperCase(password) {
        return /[A-Z]/.test(password);
    }

    const updateStrength = (password) => {
        let strength = 0;
        if(password.length > 0){
            strength += 1;
        }
        if(password.length > 7){
            strength += 2;
        }
        if(passwordHasNumber(password)){
            strength += 1;
        }
        if(passwordHasUpperCase(password)){
            strength += 1;
        }
        return strength;
    }

    useEffect(() => {
        setStrength(updateStrength(password));
    }, [password])

    return strength;
}

export default usePasswordStrength;