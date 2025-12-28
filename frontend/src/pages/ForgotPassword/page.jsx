import { ArrowLeft, ArrowRight, Mail } from "lucide-react"
import Logo from "../../components/Logo"
import "../../styles/auth_sec.scss"
import Input from "../../components/Input"
import { useState } from "react"
import ButtonPrimary from "../../components/ButtonPrimary"
import { useMutation } from "@tanstack/react-query"
import api from "../../api/client"
import { useNavigate } from "react-router-dom"
import { message } from "../../components/Toast"
import Confirm from "./confirm"

const ForgotPassword = () =>{
    const [email,setEmail] = useState("");
    const [sent,setSent] = useState(false);
    const navigate = useNavigate();

    const {mutate,isPending} = useMutation({
        mutationFn: (data) => api.post('/auth/forgot-password', data),
        onSuccess: (data) => {
          message.success(data.data.message);
          setSent(true);
        },
        onError: (error) => {
          message.error(error.response.data.message);
        },
      });
    
    const handleSubmit = () =>{
        if (email) {
          mutate({email});
        }else{
          message.error("Please fill all the fields");
        }
      }
    if (sent) return <Confirm sent={sent} setSent={setSent}/>
    return <div className="auth_sec page_in">
        <div className="form">
            <Logo full/>
            <div className="card">
                <div className="intro">
                    <div className="icon">
                        <Mail size={28} color="rgb(var(--primary-color))"/>
                    </div>
                    <h2>Forgot password?</h2>
                    <p>No worries, we'll send you reset instructions.</p>
                </div>
                <div className="inputs">
                    <Input type="email" placeholder="you@example.com" field_name="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
                    <ButtonPrimary disabled={isPending} onClick={handleSubmit} text={
                        <>
                            Continue &nbsp;
                            <ArrowRight size={17} color="white"></ArrowRight>
                        </>
                    }></ButtonPrimary>
                </div>
                <div className="refer-links" onClick={() => navigate("/signin")}>
                    <ArrowLeft color="rgb(var(--text-primary))" size={18}></ArrowLeft> Back to sign in
                </div>
            </div>
        </div>
    </div>
}

export default ForgotPassword