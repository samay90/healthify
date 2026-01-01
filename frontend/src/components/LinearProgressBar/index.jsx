import { useEffect, useRef } from "react"
import "./style.scss"
import {getColor} from "../../functions/color"
const LinearProgressBar = ({progress,className,color}) =>{
    const ref = useRef(null);
    const ref2 = useRef(null);

    useEffect(()=>{
        if (ref && ref.current && ref2 && ref2.current){
            const p = progress || 0;
            ref2.current.style.width = `${p}%`;
            if (color){
                ref.current.style.backgroundColor = `rgb(var(${color}),0.1)`;
                ref2.current.style.backgroundColor = `rgb(var(${color}))`;
            }else{
                ref.current.style.backgroundColor = getColor(progress,0.1);
                ref2.current.style.backgroundColor = getColor(progress);
            }
        }
    },[progress])
    
    return <div className={`linear_progress_bar ${className}`}>
        <div ref={ref} className="track">
            <span ref={ref2} className="progress"></span>
        </div>
    </div>
}

export default LinearProgressBar