import { UserProvider } from "./store/User";
import { Routes ,Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/SignIn/page";
import SignUp from "./pages/SignUp/page";
import ForgotPassword from "./pages/ForgotPassword/page";
import ResetPassword from "./pages/ResetPassword/page";
import { useQuery } from "@tanstack/react-query";
import api from "./api/client";
import Loading from "./components/LoadingMain";
import Dashboard from "./controllers/Dashboard";
import { useEffect } from "react";
  
const App = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const {data,isError,error,isLoading} = useQuery({
    queryKey: [`user`],
    queryFn: () => api.get("/user/info").then((res) => res.data),
    retry:false
  })
  
  if (isError && pathname.split("/")[1]==="dashboard") {
  return <Navigate to="/signin" replace />;
}
  
  if (isLoading) {
    return <Loading/>
  }
  return (
    <>
      <Toaster/>
      <UserProvider value={data}>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/dashboard/*" element={<Dashboard/>}></Route>
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
