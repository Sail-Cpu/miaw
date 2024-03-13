import {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//ui
import { toast } from 'sonner';
//Context
import {AuthContext} from "../../context/AuthContext.jsx";
//Components
import Input from "../../pages/components/inputs/Input";
import Select from "../../pages/components/inputs/Select";
import Upload from "../../pages/components/inputs/Upload";
import Button from "../../pages/components/inputs/Button";
import {userExist} from "../../requests/auth.js";

const ProfileForm = () => {

    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        if(await userExist({username: formData.get("username")}) === true){
            toast.error("username already is in use");
            return;
        }
        setUser({
            ...user,
            username: formData.get("username"),
            job: formData.get("jobs")
        })
        navigate("/sign/step3");
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Profile</h1>
            <div className="sign-page-form">
                <Input name="username" type="text" holder="walter_white"/>
                <Select name="jobs" />
                <Upload name="Picture profile" />
            </div>
            <div className="button-container">
                <Button name="Submit" />
            </div>
        </form>
    )
}

ProfileForm.propTypes = {
    setStep: PropTypes.func
};

export default ProfileForm;