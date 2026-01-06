import { Link, useLocation } from "react-router-dom"
import Logo from "../Logo"
import "./style.scss"
import { Calendar, Home, LogOut, User, UtensilsCrossed } from "lucide-react"
import Avatar from "../Avatar"
import { useContext } from "react"
import { userContext } from "../../store/User"
import moment from "moment"
import { useMutation } from "@tanstack/react-query"
import api from "../../api/client"
import Spinner from "../Spinner"
import { message } from "../Toast"
const SideBar = () =>{
    const {pathname} = useLocation();
    const {data} = useContext(userContext);
    
    const nav_tabs = [
    {
        name:"Dashboard",
        path:"/dashboard",
        icon:<Home/>
    },
    {
        name:"Food Log",
        path:"/dashboard/food-log/"+moment().format("MM-DD-YYYY"),
        match:"/dashboard/food-log",
        icon:<UtensilsCrossed/>
    },
    {
        name:"Calendar",
        path:"/dashboard/calendar/"+moment().format("MM-01-YYYY"),
        match:"/dashboard/calendar",
        icon:<Calendar/>
    },
    {
        name:"Profilie",
        path:"/dashboard/profile",
        icon:<User/>
    }
]   
    const checkMatch = (match,path) => {
        if (match){
            return pathname.startsWith(match);
        }
        return pathname===path;
    }
    const {mutate:signOut,isPending} = useMutation({
        mutationFn: () => api.post("/auth/signout").then((res) => res.data),
        onSuccess: (data) => {            
            window.location.reload();
        },
        onError: (error) => {
            message.error(error.response.data.message);
        }
    })
    return (
        <div className="side_bar">
            <div className="mobile_header">
                <Logo full/>
            </div>
            <div className="mobile_nav">
                {nav_tabs.map((tab,key)=>{
                    return <Link key={key} className={`tab ${checkMatch(tab.match,tab.path)?" active":""}`} to={tab.path}>
                        <span className="icon">{tab.icon}</span>
                        <span className="name">{tab.name}</span>
                    </Link>
                })}
            </div>
            <div className="nav">
                <div className="logo_container">
                    <Logo full/>                
                </div>
                <div className="tabs">
                    {nav_tabs.map((tab,key)=>{
                        return <Link key={key} className={`tab ${checkMatch(tab.match,tab.path)?" active":""}`} to={tab.path}>
                            <span className="icon">{tab.icon}</span>
                            <span className="name">{tab.name}</span>
                        </Link>
                    })}
                </div>
            </div>
            <div className="account">
                <div className="account_card">
                    <Avatar chr={data.name} url={data.pic} size={40}/>
                    <div className="info">
                        <h3>{data.name}</h3>
                        <p>{data.email}</p>
                    </div>
                </div>
                <div onClick={()=>signOut()} className={`tab ${isPending?" disabled":""}`}>
                    {
                        isPending?<Spinner className={"spinner"}/>:<>
                        <span className="icon"><LogOut/></span>
                        <span className="name">Sign Out</span>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBar