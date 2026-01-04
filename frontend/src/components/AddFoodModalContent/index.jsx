import { useContext, useEffect, useState } from "react"
import Input from "../Input"
import "./style.scss"
import { Info, Plus, Trash, Trash2, TriangleAlert } from "lucide-react"
import ButtonPrimary from "../ButtonPrimary"
import { useMutation } from "@tanstack/react-query"
import { modalContext } from "../../store/modal"
import api from "../../api/client"
import { message } from "../Toast"
import { queryClient } from "../../main"

const AddFoodModalContent = ({image,initData}) =>{
    const {closeModal} = useContext(modalContext);    
    const [form,setForm] = useState({
        food_name:"",
        calories:null,
        protein:null,
        carbs:null,
        fats:null,
        ingredients:[],
        warnings:[],
    })
    useEffect(()=>{
        if (initData){
            setForm(initData);
        }
    },[initData])
    const [ingredient,setIngredient] = useState("");
    const handleAddIngredient = (value) => {
        value = value.trim();
        if (value) {
            setForm(prev => ({
                ...prev,
                ingredients:[...prev.ingredients,value]
            }));
            setIngredient("");
        }
    }
    const handleRemoveIngredient = (index) => {
        setForm(prev => ({
            ...prev,
            ingredients:[...prev.ingredients.slice(0,index),...prev.ingredients.slice(index+1)]
        }));
    }
    const addData = (data) =>{        
        const fd = new FormData();
        fd.append("image",image);
        fd.append("food_name",data.food_name);
        fd.append("calories",data.calories);
        fd.append("protein",data.protein);
        fd.append("carbs",data.carbs);
        fd.append("fats",data.fats);
        fd.append("ingredients",JSON.stringify(data.ingredients));
        fd.append("warnings",JSON.stringify(data.warnings));
        mutate(fd);
    }
    const {mutate,isPending} = useMutation({
        mutationFn: (data) => api.post('/user/add-food', data,{
            headers: {"Content-Type":"multipart/form-data"}
        }),
        onSuccess: (data) => {
            message.success(data.data.message);
            queryClient.invalidateQueries({ queryKey: ["insights"] });
            queryClient.invalidateQueries({ queryKey: ["foodLogs"] });
            queryClient.invalidateQueries({ queryKey: ["foodWarnings"] });
            closeModal();
        },
        onError: (error) => {
            message.error(error.response.data.message);
        },
    })
    return <div className="add_food_item">
        <div className="header">
            <h2>Add Food</h2>
        </div>
        <div className="form">
            <div className="line">
            <Input type="text" required placeholder="Food Name" onChange={(e) => setForm({...form,food_name:e.target.value})} value={form.food_name} field_name="Food Name"/>
            </div>
            <div className="group">
            <Input required type="number" placeholder="540" onChange={(e) => setForm({...form,calories:e.target.value})} value={form.calories} field_name="Calories (kcal)"/>
            <Input required type="number" placeholder="17" onChange={(e) => setForm({...form,protein:e.target.value})} value={form.protein} field_name="Protein (g)"/>
            <Input required type="number" placeholder="50" onChange={(e) => setForm({...form,carbs:e.target.value})} value={form.carbs} field_name="Carbs (g)"/>
            <Input required type="number" placeholder="20" onChange={(e) => setForm({...form,fats:e.target.value})} value={form.fats} field_name="Fats (g)"/>
            </div>
            <div className="line">
                <Input type="text" onEnter={handleAddIngredient} placeholder="Mushrooms..." onChange={(e) => setIngredient(e.target.value)} value={ingredient} field_name="Ingredients">
                    <div className="items">
                        {
                            form.ingredients.map((item,index) => <div className="element" key={index}>
                                {item}
                                <Trash2 size={16} onClick={()=>handleRemoveIngredient(index)}/>
                            </div>)
                        }
                    </div>
                </Input>
            </div>
            {
            form.warnings.length?
            <div className="warnings">
                <div className="text">
                    <h3>Warnings & Info</h3>
                </div>
                <div className="items">
                    {
                        form.warnings.map(({warning_text,warning_type},index)=>{
                            return <div className="element" style={{"--color":warning_type==="INFO"?"var(--text-primary)":"var(--accent-color)"}} key={index}>
                                <span>
                                    <span className="icon">{warning_type==="INFO"?<Info/>:<TriangleAlert/>}</span>
                                    <p>{warning_text}</p>
                                </span>
                                <span className="icon">
                                <Trash2 size={20} onClick={()=>{
                                    setForm(prev => ({
                                        ...prev,
                                        warnings:[...prev.warnings.slice(0,index),...prev.warnings.slice(index+1)]
                                    }));
                                }}/>
                                </span>
                            </div>
                        })
                    }
                </div>
            </div>:""
            }
            <ButtonPrimary disabled={isPending} text={<><Plus color="white"/>&nbsp; Add Food</>} onClick={()=>addData(form)}/>
        </div>
    </div>
}

export default AddFoodModalContent