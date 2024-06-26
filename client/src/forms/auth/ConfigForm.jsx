import {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';
//Components
import OS from '../../components/inputs/OS';
import SubmitButton from '../../components/inputs/SubmitButton.jsx';
import {AuthContext} from "../../context/AuthContext.jsx";
import {signUp} from "../../redux/auth/action.js";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const ConfigForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, setUser} = useContext(AuthContext)
    const [choice, setChoice] = useState("");

    const [done, setDone] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!done && choice === "windows" || choice === "mac"){
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
            setDone(true);
            fetchData().then(response => {
                console.log(response)
                if(response?.success){
                    toast.success("the user has been created successfully");
                    setTimeout(() => {
                        setUser({
                            email: "",
                            password: "",
                            username: "",
                            image: "",
                            job: "",
                            os: "",
                        })
                        navigate("/");
                    }, 1000)
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
                <SubmitButton name="Submit"/>
            </div>
        </form>
    )
}

ConfigForm.propTypes = {
    setStep: PropTypes.func
};

export default ConfigForm;