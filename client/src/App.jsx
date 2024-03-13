import {BrowserRouter, Routes, Route} from "react-router-dom";
//Pages
import Register from "./pages/auth/Register.jsx";
import RegisterForm from "./forms/auth/RegisterForm.jsx";
import ProfileForm from "./forms/auth/ProfileForm.jsx";
import ConfigForm from "./forms/auth/ConfigForm.jsx";
import Login from "./pages/auth/Login.jsx";

function App() {

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
