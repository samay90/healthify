import "./style.scss"
import NoImage from "../../assets/images/no-image.jpg"
import Card from "../Card"
import {foodLimits} from "../../static/constants"
import { getColor } from "../../functions/color"
import { percentage } from "../../functions/percentage"
import moment from "moment"
import { Clock } from "lucide-react"
import { useContext } from "react"
import { modalContext } from "../../store/modal"
import FoodModalContent from "../../FoodModalContent"

const FoodCard = ({food}) =>{
    const {openModal,closeModal} = useContext(modalContext);
    return <>
    <div className="food_card" onClick={() => openModal(<FoodModalContent closeModal={closeModal} food_id={food.food_log_id}/>)}>
        <Card>
            <img src={food.image??NoImage} alt=""></img>
            <span className="time"><Clock size={10}/> {moment(parseInt(food.created_at)).fromNow()}</span>
            <div className="info">
                <div className="name">
                    <p>{food.food_name}</p>
                </div>
                <div className="nutrition">
                    <span>
                        <p>Calories</p>
                        <p style={{color:getColor(percentage(food.calories,foodLimits.calories))}}>{food.calories} kcal</p>
                    </span>
                    <span>
                        <p>Protein</p>
                        <p style={{color:"rgb(var(--primary-color))"}}>{food.protein} g</p>
                    </span>
                    <span>
                        <p>Carbs</p>
                        <p style={{color:getColor(percentage(food.carbs,foodLimits.carbs))}}>{food.carbs} g</p>
                    </span>
                    <span>
                        <p>Fats</p>
                        <p style={{color:getColor(percentage(food.fats,foodLimits.fats))}}>{food.fats} g</p>
                    </span>
                </div>
            </div>
        </Card>
    </div></>
}

export default FoodCard