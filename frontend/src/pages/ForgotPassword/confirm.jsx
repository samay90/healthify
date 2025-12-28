import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react"
import Logo from "../../components/Logo"
import "../../styles/auth_sec.scss"
import Input from "../../components/Input"
import { useState } from "react"
import ButtonPrimary from "../../components/ButtonPrimary"
import { useMutation } from "@tanstack/react-query"
import api from "../../api/client"
import { useNavigate } from "react-router-dom"
import { message } from "../../components/Toast"

const Confirm = ({sent,setSent}) =>{
    const navigate = useNavigate();

    return <div className="auth_sec page_in">
        <div className="form">
            <Logo full/>
            <div className="card">
                <div className="intro">
                    <div className="icon">
                        <Check size={28} color="rgb(var(--primary-color))"/>
                    </div>
                    <h2>Check you Email!</h2>
                    <p>We have sent a reset link to your email.</p>
                </div>
                
                <div className="refer-links" onClick={() => setSent(false)}>
                    <ArrowLeft color="rgb(var(--text-primary))" size={18}></ArrowLeft> Didn't receive the email?
                </div>
            </div>
        </div>
    </div>
}

export default Confirm