import Input from "../../components/Input";
import "../../styles/auth.scss";
import Logo from "../../components/Logo";
import { useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import { ArrowRight, Check, CircleCheck, MailCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/client";
import { message } from "../../components/Toast";
import Verify from "./verify";

const SignIn = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [token,setToken] = useState("");
  const {mutate,isPending} = useMutation({
    mutationFn: (data) => api.post('/auth/signup', data),
    onSuccess: (data) => {
      message.success(data.data.message);      
      setToken(data.data.body.token);
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });
  
  const handleSubmit = () =>{
    if (form.email) {
      mutate(form);
    }else{
      message.error("Please fill all the fields");
    }
  }
  if (token) return <Verify setToken={setToken} token={token}></Verify> 
  return (
    <div className="auth_page page_in">
      <div className="left info">
        <h1 className="title">Start Your Health Journey Today</h1>
        <p className="desc">
          Log your meals, monitor your calories, and achieve your health goals
          with Healthify.
        </p>
        <div className="feat_info">
          <div>
            <span><Check color="white" size={18}/></span>
            <p>Track calories and macros effortlessly</p>
          </div>
          <div>
            <span><Check color="white" size={18}/></span>
            <p>Snap photos of your meals for quick logging</p>
          </div>
          <div>
            <span><Check color="white" size={18}/></span>
            <p>Get personalized nutrition insights</p>
          </div>
        </div>
      </div>
      <div className="right form">
        <div className="form__card">
          <Logo full={true}></Logo>
          <h2 className="text-1">Create Account</h2>
          <p className="text-2">Start tracking your nutrition today</p>
          <div className="input_container">
            <Input
              type={"email"}
              placeholder={"you@example.com"}
              value={form.email ?? ""}
              field_name={"Email"}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <p className="extra-info">
              <MailCheck color="grey"/>
              You will receive an email to verify your account 
            </p>
            <ButtonPrimary disabled={isPending} onClick={handleSubmit} text={
              <>Continue &nbsp;<ArrowRight color="white" size={18}/></>
            }/>
            <div className="refer-links">
              <p>Already have an account?</p>
              <Link className="link" to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
