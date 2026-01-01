import { useEffect, useRef } from "react"
import "./style.scss"
import {getColor} from "../../functions/color"
const CircularProgressBar = ({children,progress,className}) =>{
    const ref = useRef(null);
    
    
    useEffect(()=>{
        if (ref && ref.current){
            const p = progress || 0;
            const circle = ref.current;
            const r = circle.r.baseVal.value;
            const C = 2 * Math.PI * r;

            circle.style.strokeDasharray = C;
            circle.style.strokeDashoffset = C * (1 - p / 100);
            circle.style.stroke = getColor(progress);
        }
    },[progress])
    
    return <div className={`circular_progress_bar ${className}`}>
        <svg className="progress_bar">
            <circle cx="50%" cy="50%" r="45%"/>
            <circle ref={ref} cx="50%" cy="50%" r="45%" className="progress"/>
        </svg>
        {children}
    </div>
}

export default CircularProgressBar