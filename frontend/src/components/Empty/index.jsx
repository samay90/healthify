import { Heart } from "lucide-react"
import "./style.scss"
import Spinner from "../Spinner"
const Empty = ({text,isLoading}) =>{
    return <div className="empty">
        {
            isLoading?<Spinner className={"empty_spinner"}/>:<><span>
        <Heart/>
        </span>
        <h3>{text}</h3>
        </>
        }
    </div>
}

export default Empty