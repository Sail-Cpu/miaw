import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
//Pages
import Register from "./pages/auth/Register.jsx";
import RegisterForm from "./forms/auth/RegisterForm.jsx";
import ProfileForm from "./forms/auth/ProfileForm.jsx";
import ConfigForm from "./forms/auth/ConfigForm.jsx";
import Login from "./pages/auth/Login.jsx";
import Miaw from "./app/Miaw.jsx";
import Software from "./pages/Software.jsx";
import {isLoggedInSelector} from "./redux/auth/selector.js";
import Course from "./pages/Course.jsx";
import User from "./pages/User.jsx";
import UserSoftware from "./pages/user/UserSoftware.jsx";

function App() {

  const isLoggedIn = useSelector(isLoggedInSelector);

  const protectedRoute = () => {
    return(
        isLoggedIn &&
          <Route path="/" element={<Miaw />}>
            <Route path="/software/:appId" element={<Software />} />
            <Route path="/software/:appId/course" element={<Course />} />
            <Route path="/user" element={<User />}>
              <Route path="/user/software/:appId" element={<UserSoftware />} />
            </Route>
          </Route>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign" element={<Register />}>
            <Route path="/sign" element={<RegisterForm />} />
            <Route path="/sign/step2" element={<ProfileForm />} />
            <Route path="/sign/step3" element={<ConfigForm />} /> 
          </Route>
          <Route path="login" element={<Login />} />
          {protectedRoute()}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
