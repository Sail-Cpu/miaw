import {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';
//Components
import OS from '../../pages/components/inputs/OS';
import Button from '../../pages/components/inputs/Button';
import {AuthContext} from "../../context/AuthContext.jsx";
import {signUp} from "../../redux/auth/action.js";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const ConfigForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, setUser} = useContext(AuthContext)
    const [choice, setChoice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(choice === "windows" || choice === "mac"){
            setUser({
                ...user,
                os: choice
            })
        }
    }

    async function fetchData() {
        return await dispatch(signUp(user));
    }

    useEffect(() => {
        if(user.username.length === 0) navigate("/sign/step2");
        if(user.os){
            fetchData().then(response => {
                if(response.data){
                    toast.success("the user has been created successfully")
                }else{
                    toast.error(response.message);
                }
            })
        }
    }, [user])

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Configuration</h1>
            <div className="sign-page-form">
                <OS name="OS" choice={choice} setChoice={setChoice}/>
            </div>
            <div className="button-container">
                <Button name="Submit"/>
            </div>
        </form>
    )
}

ConfigForm.propTypes = {
    setStep: PropTypes.func
};

export default ConfigForm;