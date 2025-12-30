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

const Verify = ({token,setToken}) =>{
    const [code,setCode] = useState("");
    const navigate = useNavigate();

    const {mutate,isPending} = useMutation({
        mutationFn: (data) => api.post('/auth/verify', data),
        onSuccess: (data) => {
          message.success(data.data.message);
          setCode("");
          navigate("/dashboard");
        },
        onError: (error) => {
          message.error(error.response.data.message);
        },
      });
    
    const handleSubmit = () =>{
        if (code) {
          mutate({token,otp:parseInt(code)});
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
                        <Mail size={28} color="rgb(var(--primary-color))"/>
                    </div>
                    <h2>Check your email!</h2>
                    <p>Just enter the code sent to your email.</p>
                </div>
                <div className="inputs">
                    <Input type="text" placeholder="••••••" field_name="Code" value={code} onChange={(e)=>setCode(e.target.value)}></Input>
                    <ButtonPrimary disabled={isPending} onClick={handleSubmit} text={
                        <>
                            Verify &nbsp;
                            <ArrowRight size={17} color="white"></ArrowRight>
                        </>
                    }></ButtonPrimary>
                </div>
                <div className="refer-links" onClick={() => setToken("")}>
                    <ArrowLeft color="rgb(var(--text-primary))" size={18}></ArrowLeft> Back to sign up
                </div>
            </div>
        </div>
    </div>
}

export default Verify