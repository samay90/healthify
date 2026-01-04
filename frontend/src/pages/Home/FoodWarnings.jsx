import { useQuery } from "@tanstack/react-query"
import api from "../../api/client";
import { Info, TriangleAlert } from "lucide-react";

const FoodWarnings = () =>{
    const {data:foodWarnings,isLoading} = useQuery({
        queryFn : () => api.get(`/info/nutrition/insights`).then((res) => res.data),
        queryKey: ["foodWarnings"]
    })    
    return <>
        <div className="food_logs">
            <div className="header">
                <h2>Today's Insights</h2>
            </div>
            <div className="warnings">
                {
                    foodWarnings?.data?.map(({warning_text,warning_type},key)=>{
                        return <div style={{"--color":warning_type==="INFO"?"var(--text-primary)":"var(--accent-color)"}} className={`warning ${warning_type}`} key={key}>
                           {
                            warning_type==="INFO"?<Info size={18}/>:<TriangleAlert size={18}/>
                           }
                            <p className="text">{warning_text}</p>
                        </div>
                    })
                }
            </div>
        </div> 
    </>
}


export default FoodWarnings
