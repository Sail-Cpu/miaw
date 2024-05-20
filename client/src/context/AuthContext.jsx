import {createContext, useState} from "react";
import PropTypes from 'prop-types';


export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        job: "",
        image: "",
        os: "",
    })

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContextProvider;