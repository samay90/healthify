import { ArrowLeft, ArrowRight, KeyRound, Mail } from "lucide-react"
import Logo from "../../components/Logo"
import "../../styles/auth_sec.scss"
import Input from "../../components/Input"
import { useState } from "react"
import ButtonPrimary from "../../components/ButtonPrimary"
import { useMutation } from "@tanstack/react-query"
import api from "../../api/client"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { message } from "../../components/Toast"
import NotFound from "../NotFound/page"

const ResetPassword = () =>{
    const navigate = useNavigate();
    const [form,setForm] = useState({});
    const queries = new URLSearchParams(location.search);
    const token = queries.get("token").split(" ").join("+");
    const code = queries.get("code");
    if (!token || !code) return <NotFound/>
    const {mutate,isPending} = useMutation({
        mutationFn: (data) => api.post('/auth/reset-password', data),
        onSuccess: (data) => {
          message.success(data.data.message);
          navigate('/signin')
        },
        onError: (error) => {
          message.error(error.response.data.message);
        },
    });
    
    const handleSubmit = () =>{
        if (form.password && form.confirm_password) {
            if (form.password === form.confirm_password) {
                mutate({token,otp:parseInt(code),password:form.password});
            }else{
                message.error("Passwords do not match");
            }
        }else{
            message.error("Please fill all the fields");
        }
    }
    return <div className="auth_sec page_in">
        <div className="form">
            <Logo full/>
            <div className="card">
                <div className="intro">
                    <div className="icon">
                        <KeyRound size={28} color="rgb(var(--primary-color))"/>
                    </div>
                    <h2>Reset password!</h2>
                    <p>Just a few more steps to reset your password.</p>
                </div>
                <div className="inputs">
                    <Input type="password" placeholder="••••••••" field_name="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}></Input>
                    <Input type="password" placeholder="••••••••" field_name="Confirm Password" value={form.confirm_password} onChange={(e)=>setForm({...form,confirm_password:e.target.value})}></Input>
                    <ButtonPrimary disabled={isPending} onClick={handleSubmit} text={
                        <>
                            Reset &nbsp;
                            <ArrowRight size={17} color="white"></ArrowRight>
                        </>
                    }></ButtonPrimary>
                </div>
            </div>
        </div>
    </div>
}

export default ResetPassword