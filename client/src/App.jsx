import {BrowserRouter, Routes, Route} from "react-router-dom";
//Pages
import Register from "./pages/auth/Register.jsx";
import RegisterForm from "./forms/auth/RegisterForm.jsx";
import ProfileForm from "./forms/auth/ProfileForm.jsx";
import ConfigForm from "./forms/auth/ConfigForm.jsx";
import Login from "./pages/auth/Login.jsx";
import Miaw from "./app/Miaw.jsx";
import Software, {AppDetails} from "./pages/Software.jsx";
import Course from "./pages/Course.jsx";
import User from "./pages/User.jsx";
import UserSoftware from "./pages/user/UserSoftware.jsx";
import KnowledgeTest from "./pages/KnowledgeTest.jsx";
import SpeedTest from "./pages/keyboard/SpeedTest.jsx";
import Admin from "./pages/admin/Admin.jsx";
import CreateSoftware from "./pages/admin/create/CreateSoftware.jsx";
import UpdateSoftware from "./pages/admin/update/UpdateSoftware.jsx";
import Home from "./pages/Home.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";

function App() {

  const protectedRoute = () => {
    return(
          <Route path="/" element={<Miaw />}>
            <Route path="/" element={<Home />} />
            <Route path="/software/:appId" element={<Software />} >
                <Route path="/software/:appId/" element={<AppDetails />} />
                <Route path="/software/:appId/course" element={<Course />} />
                <Route path="/software/:appId/test" element={<KnowledgeTest />} />
            </Route>
            <Route path="/speedtest" element={<SpeedTest />} />
            <Route path="/user" element={<User />}>
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/software/:appId" element={<UserSoftware />} />
            </Route>
              <Route path="/admin" element={<Admin />}>
                  <Route path="/admin/create/software" element={<CreateSoftware />} />
                  <Route path="/admin/update/software" element={<UpdateSoftware />} />
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
