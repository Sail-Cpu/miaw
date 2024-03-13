import {useDispatch} from "react-redux";

import Input from "../components/inputs/Input.jsx";
import Button from "../components/inputs/Button.jsx";
import {SignIn} from "../../redux/auth/action.js";
import {toast, Toaster} from "sonner";

const Login = () => {

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await dispatch(SignIn({
            username: formData.get("username"),
            password: formData.get("password")
        })).then(response => {
            if(response.data){
                toast.success("Login success");
            }else{
                toast.error(response.message);
            }
        });
    }


    return(
        <div className="sign-page login-page">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Login</h1>
                <div className="sign-page-form">
                    <Input name="username" type="text" holder="walter_white"/>
                    <Input name="password" type="password" />
                </div>
                <div className="button-container">
                    <Button name="Submit" />
                </div>
            </form>
            <Toaster position="top-right" richColors closeButton />
        </div>
    )
}

export default Login;