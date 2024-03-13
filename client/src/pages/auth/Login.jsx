import Input from "../components/inputs/Input.jsx";
import Button from "../components/inputs/Button.jsx";

const Login = () => {
    return(
        <div className="sign-page login-page">
            <form>
                <h1>Login</h1>
                <div className="sign-page-form">
                    <Input name="username" type="text" holder="walter_white"/>
                    <Input name="password" type="password" />
                </div>
                <div className="button-container">
                    <Button name="Submit" />
                </div>
            </form>
        </div>
    )
}

export default Login;