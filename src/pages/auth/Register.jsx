//Components
import Input from "../components/inputs/Input.jsx";
import Button from "../components/inputs/Button.jsx";
import PassProgress from "../components/inputs/PassProgress.jsx";

const Register = () => {

    return(
        <div className="sign-page register-page">
            <form>
                <h1>Register</h1>
                <div className="sign-page-form">
                    <Input name="email" type="email" holder="you@email.com" />
                    <Input name="password" type="password" />
                    <PassProgress />
                    <Input name="confirm password" type="password" />
                </div>
                <div className="button-container">
                    <Button type="submit" name="Submit" />
                </div>
            </form>
        </div>
    )
}

export default Register;