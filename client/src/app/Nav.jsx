import {useNavigate} from "react-router-dom";
import HeaderNav from "../components/navigations/HeaderNav.jsx";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {disconnectAction} from "../redux/auth/action.js";
import allIcons from "../utils/allIcons.js";


const Nav = ({isLoggedIn}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const disconnect = () => {
        localStorage.removeItem("persist:root");
        dispatch(disconnectAction());
        navigate("/login");
    }

    const nav = {
        connected: {
            tabs: [
                {
                    name: "Landing",
                    link: "/landing",
                },
                {
                    name: "User",
                    link: "/user",
                },
                {
                    name: "Home",
                    link: "/",
                },

            ],
            buttons: [
                {
                    name: "Disconnect",
                    background: true,
                    action: disconnect
                }
            ],
            theme: true,
            search: false,
            logo: false
        },
        disconnected: {
            tabs: [
                {
                    name: "Landing",
                    link: "/landing",
                },
            ],
            buttons: [
                {
                    icon: allIcons.user,
                    name: "Login",
                    background: false,
                    action: () => navigate("/login")
                },
                {
                    name: "Sign up",
                    background: true,
                    action: () => navigate("/sign")
                }
            ],
            theme: true,
            search: false,
            logo: true
        }
    }

    return <HeaderNav params={isLoggedIn ? nav.connected : nav.disconnected}/>
}

Nav.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default Nav;