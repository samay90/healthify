import {UtensilsCrossed} from "lucide-react";
import "./style.scss";

const Logo = ({full}) => {
    return (
        <div className="logo">
            <span className="icon">
                <UtensilsCrossed size={25} color="white"></UtensilsCrossed>
            </span>
            {full?<h2>{"Healthify".split("").map((char,i)=><span key={i} style={{animationDelay:(i*0.05)+"s"}}>{char}</span>)}</h2>:""}
        </div>
    )
}

export default Logo;