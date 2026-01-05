import { SearchIcon, X } from "lucide-react"
import "./style.scss"
const Search = ({search,setSearch}) =>{
    return <div className="search_box">
        <span>
        <SearchIcon className="search"/>
        </span>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search..."></input>
        <span onClick={()=>setSearch("")}>
        <X className="cross"/>
        </span>
    </div>
}

export default Search