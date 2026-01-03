import { useEffect, useRef, useState } from "react";
import "./style.scss";
import {Link} from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Input = ({required,children,type,placeholder,onEnter,field_name,onChange,value,secondary_link,secondary_text}) =>{
    const [vis,setVis] = useState(false);
    return <>
        <div className="input_field">
            <div className="info_area">
                <label>{field_name}</label>
                {secondary_text?<Link className="link" to={secondary_link}>{secondary_text}</Link>:""}
            </div>
            <div className="input">
                <input required={required} onKeyDown={(e)=>{
                    if (e.key=="Enter") onEnter(value)
                }} type={type=="password"?(vis?"text":"password"):type} placeholder={placeholder} onChange={onChange} value={value} />
                {
                    type=="password"?<span className="visibility_icon" onClick={()=>setVis(!vis)}>
                        {!vis?<Eye size="22" color="grey"></Eye>:<EyeOff size="22" color="grey"></EyeOff>}
                    </span>:""
                }
                {children}
            </div>
        </div>
    </>
}

export default Input;