import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
//Pages
import Register from "./pages/auth/Register.jsx";
import RegisterForm from "./forms/auth/RegisterForm.jsx";
import ProfileForm from "./forms/auth/ProfileForm.jsx";
import ConfigForm from "./forms/auth/ConfigForm.jsx";
import Login from "./pages/auth/Login.jsx";
import Miaw from "./app/Miaw.jsx";

function App() {

  const { isLoggedIn } = useSelector((state) => state.auth);

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
          <Route path="/" element={isLoggedIn && <Miaw />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
