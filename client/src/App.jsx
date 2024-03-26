import {BrowserRouter, Routes, Route} from "react-router-dom";
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

function App() {

  const isLoggedIn = useSelector(isLoggedInSelector);

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
          <Route path="/" element={isLoggedIn && <Miaw />}>
            <Route path="/software/:appId" element={isLoggedIn && <Software />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
