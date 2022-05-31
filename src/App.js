import { LogIn } from "./components/LogIn";
import Signup from "./components/Signup";
import AuthContext from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

import PrivateRoute from "./components/PrivateRoute";
import ForgetPassword from "./components/ForgetPassword";
import UpdateProfile from "./components/UpdateProfile";
function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/update-profile" element={<PrivateRoute />}>
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
