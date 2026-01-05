import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/client";
import Spinner from "../components/Spinner";
import NoImage from "../assets/images/no-image.jpg"
import "./style.scss"
import { Beef, Clock, Droplets, Flame, Info, Trash, Trash2, TriangleAlert, Wheat } from "lucide-react";
import moment from "moment";
import { message } from "../components/Toast";
import ButtonSecondary from "../components/ButtonSecondary";
import { queryClient } from "../main";

const FoodModalContent = ({food_id,closeModal}) =>{
    const {isLoading,data:food} = useQuery({
        queryFn: () => api.get(`/info/food/${food_id}`).then((res) => res.data),
        queryKey: ["food-"+food_id]
    })
    const {mutate:deleteFood,isPending} = useMutation({
        mutationFn: (data) => api.post('/user/delete-food', data),
        onError: (error) => {
            message.error(error.response.data.message);
        },
        onSuccess: (data) => {
            message.success(data.data.message);
            queryClient.invalidateQueries({ queryKey: ["insights"] });
            queryClient.invalidateQueries({ queryKey: ["foodLogs"] });
            queryClient.invalidateQueries({ queryKey: ["foodWarnings"] });
            closeModal();
        }
    })
    return <div className="food_modal">
        {isLoading?<Spinner/>:<>
            <div className="header">
                <p className="time">
                    <Clock size={16}/> {moment(parseInt(food.data.created_at)).fromNow()}
                </p>
                <h2>
                    {food.data.food_name}
                </h2>
                <img src={food.data.pic??NoImage} alt=""></img>
            </div>
            <div className="nutrients">
                <div className="stat" style={{"--color":"var(--accent-color)"}}>
                    <div className="icon">
                        <Flame size={18}/>
                    </div>
                    <div className="info">
                        <h3>{food.data.calories} kcal</h3>
                        <span>Calories</span>
                    </div>
                </div>
                <div className="stat" style={{"--color":"var(--primary-color)"}}>
                    <div className="icon">
                        <Beef size={18}/>
                    </div>
                    <div className="info">
                        <h3>{food.data.protein} g</h3>
                        <span>Protein</span>
                    </div>
                </div>
                <div className="stat" style={{"--color":"var(--warning)"}}>
                    <div className="icon">
                        <Wheat size={18}/>
                    </div>
                    <div className="info">
                        <h3>{food.data.carbs} g</h3>
                        <span>Carbs</span>
                    </div>
                </div>
                <div className="stat" style={{"--color":"var(--info)"}}>
                    <div className="icon">
                        <Droplets size={18}/>
                    </div>
                    <div className="info">
                        <h3>{food.data.fats} g</h3>
                        <span>Fats</span>
                    </div>
                </div>
            </div>
            {
                food.data.ingredients.length>0?<div className="ingredients">
                    <h3>Ingredients:</h3>
                    <div className="items">
                    {
                        food.data.ingredients.map((ingredient,i) => <p key={i}>{ingredient}</p>)
                    }
                    </div>
                </div>:""
            }
            {
                food.data.warnings.length>0?<div className="warnings">
                <h3>Warnings & Info:</h3>
                <div className="items">
                {
                    food.data.warnings.map(({warning_text,warning_type},i) => <p key={i} className={warning_type}>
                        {warning_type==="INFO"?<Info size={18}/>:<TriangleAlert size={18}/>}
                        {warning_text}
                    </p>)
                }
                </div>
            </div>:""   
            }
            <ButtonSecondary disabled={isPending} onClick={() => deleteFood({food_log_id:food_id})} className="delete_button" color={"var(--accent-color)"} text={<><Trash2 size={18}/>&nbsp;Remove this food</>}/>
        </>}
    </div>
}

export default FoodModalContent