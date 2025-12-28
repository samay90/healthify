import { ArrowLeft, Ban, Cross } from "lucide-react"
import Logo from "../../components/Logo"
import "../../styles/auth_sec.scss"
import { useNavigate } from "react-router-dom"

const NotFound = () =>{
    const navigate = useNavigate();

    return <div className="auth_sec page_in">
        <div className="form">
            <Logo full/>
            <div className="card">
                <div className="intro">
                    <div className="icon">
                        <Ban size={28} color="rgb(var(--primary-color))"/>
                    </div>
                    <h2>Page Not Found</h2>
                    <p>The page you are looking for is not found.</p>
                </div>
                
                <div className="refer-links" onClick={() => navigate("/")}>
                    <ArrowLeft color="rgb(var(--text-primary))" size={18}></ArrowLeft> Navigate to home!
                </div>
            </div>
        </div>
    </div>
}

export default NotFound