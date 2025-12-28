import Input from "../../components/Input";
import "../../styles/auth.scss";
import Logo from "../../components/Logo";
import { useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/client";
import { message } from "../../components/Toast";



const SignIn = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const {mutate,isPending} = useMutation({
    mutationFn: (data) => api.post('/auth/signin', data),
    onSuccess: (data) => {
      message.success(data.data.message);
      navigate("/")
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  
  const handleSubmit = () =>{
    if (form.email && form.password) {
      mutate(form);
    }else{
      message.error("Please fill all the fields");
    }
  }
  return (
    <div className="auth_page page_in">
      <div className="right info">
        <h1 className="title">Track Your Nutrition Journey</h1>
        <p className="desc">
          Log your meals, monitor your calories, and achieve your health goals
          with Healthify.
        </p>
        <div className="numbers_info">
          <div>
            <h1>2M+</h1>
            <p>Active Users</p>
          </div>
          <div>
            <h1>50M+</h1>
            <p>Meals Logged</p>
          </div>
          <div>
            <h1>4.9</h1>
            <p>App Rating</p>
          </div>
        </div>
      </div>
      <div className="left form">
        <div className="form__card">
          <Logo full={true}></Logo>
          <h2 className="text-1">Welcome back!</h2>
          <p className="text-2">Sign in to continue your health journey</p>
          <div className="input_container">
            <Input
              type={"email"}
              placeholder={"you@example.com"}
              value={form.email ?? ""}
              field_name={"Email"}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type={"password"}
              placeholder={"••••••••"}
              value={form.password ?? ""}
              secondary_text={"Forgot password?"}
              secondary_link={"/forgot-password"}
              field_name={"Password"}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <ButtonPrimary disabled={isPending} onClick={handleSubmit} text={
              <>Sign In &nbsp;<ArrowRight color="white" size={18}/></>
            }/>
            <div className="refer-links">
              <p>Don't have an account?</p>
              <Link className="link" to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
