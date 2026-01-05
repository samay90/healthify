import { ChevronLeft, ChevronRight } from "lucide-react"
import "./style.scss"

const Pagination = ({onNext,onPrevious,children}) =>{
    return <div className="pagination">
        <button onClick={onPrevious}><ChevronLeft size={18}/></button>
        <div className="content">
            {children}
        </div>
        <button onClick={onNext}><ChevronRight size={18}/></button>
    </div>
}

export default Pagination