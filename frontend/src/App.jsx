import { UserProvider } from "./store/User";
import { Routes ,Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/SignIn/page";
import SignUp from "./pages/SignUp/page";
import ForgotPassword from "./pages/ForgotPassword/page";
import ResetPassword from "./pages/ResetPassword/page";
  
const App = () => {
  // const [user,setUser] = useState(null);

  return (
    <>
      <Toaster/>
      <UserProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
