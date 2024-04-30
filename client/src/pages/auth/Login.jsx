import {useDispatch} from "react-redux";

import Input from "../../components/inputs/Input.jsx";
import SubmitButton from "../../components/inputs/SubmitButton.jsx";
import {SignIn} from "../../redux/auth/action.js";
import {toast, Toaster} from "sonner";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let done = false;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(done) return;
        const formData = new FormData(e.currentTarget);
        await dispatch(SignIn({
            username: formData.get("username"),
            password: formData.get("password")
        })).then(response => {
            if(response.success === true){
                done = true;
                toast.success("Login success");
                setTimeout(() => {
                    navigate("/");
                }, 1000)
            }else{
                toast.error(response.message);
            }
        });
    }

    return(
        <div className="sign-page login-page">
            <Toaster position="top-right" richColors closeButton />
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Login</h1>
                <div className="sign-page-form">
                    <Input name="username" type="text" holder="walter_white"/>
                    <Input name="password" type="password" />
                </div>
                <div className="button-container">
                    <SubmitButton name="Submit" />
                </div>
                <div>
                    <span>You don't have an account <Link to='/sign'>Sign up</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Login;