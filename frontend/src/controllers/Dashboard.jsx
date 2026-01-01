import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "../pages/Home/page"
import { useContext, useEffect } from "react"
import { userContext } from "../store/User"
import SideBar from "../components/SideBar"
import "../styles/dashboard.scss"

const Dashboard = () =>{
    const user = useContext(userContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if (user && user.name) navigate("/signin");
    },[user])
    return <div className="dashboard_container">
        <SideBar/>
        <div className="dashboard">
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </div>
    </div>
}
export default Dashboard