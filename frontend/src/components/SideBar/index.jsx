import { Link, useLocation } from "react-router-dom"
import Logo from "../Logo"
import "./style.scss"
import { Calendar, Home, LogOut, User, UtensilsCrossed } from "lucide-react"
import Avatar from "../Avatar"
import { useContext } from "react"
import { userContext } from "../../store/User"
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
        path:"/dashboard/food-log",
        icon:<UtensilsCrossed/>
    },
    {
        name:"Calendar",
        path:"/dashboard/calendar",
        icon:<Calendar/>
    },
    {
        name:"Profilie",
        path:"/dashboard/profile",
        icon:<User/>
    }
]
    return (
        <div className="side_bar">
            <div className="mobile_header">
                <Logo full/>
            </div>
            <div className="mobile_nav">
                {nav_tabs.map((tab,key)=>{
                    return <Link key={key} className={`tab ${pathname==tab.path?" active":""}`} to={tab.path}>
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
                        return <Link key={key} className={`tab ${pathname==tab.path?" active":""}`} to={tab.path}>
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
                <div className="tab">
                    <span className="icon"><LogOut/></span>
                    <span className="name">Sign Out</span>
                </div>
            </div>
        </div>
    )
}

export default SideBar