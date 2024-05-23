import {useContext, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//ui
import { toast } from 'sonner';
//Context
import {AuthContext} from "../../context/AuthContext.jsx";
//Components
import Input from "../../components/inputs/Input";
import Select from "../../components/inputs/Select";
import Upload from "../../components/inputs/Upload";
import SubmitButton from "../../components/inputs/SubmitButton.jsx";
//Requests
import {userExist} from "../../requests/auth.js";

const jobs = [
    {id: 1, name:"developer"},
    {id: 2, name:"designer"},
    {id: 3, name:"video maker"},
    {id: 4, name:"other"}
]

const ProfileForm = () => {

    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
        if(user.email.length === 0) navigate("/sign")
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const job = parseInt(formData.get("jobs"));
        const username = formData.get("username");
        const image = formData.get("Picture profile");
        console.log(job, username, image.name)
        if(!username.length > 0 || job === 0 || !image.name.length > 0){
            toast.error("all fields must be completed");
            return;
        }
        let newUser = await userExist({username: username});
        if(newUser.result){
            toast.error(newUser.message);
            return;
        }
        setUser({
            ...user,
            username: username,
            job: jobs.find(actualJob => actualJob.id === job).name,
            image: image
        })
        navigate("/sign/step3");
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Profile</h1>
            <div className="sign-page-form">
                <Input name="username" type="text" holder="walter_white"/>
                <Select name="jobs" options={jobs}/>
                <Upload name="Picture profile" />
            </div>
            <div className="button-container">
                <SubmitButton name="Submit" />
            </div>
        </form>
    )
}

ProfileForm.propTypes = {
    setStep: PropTypes.func
};

export default ProfileForm;