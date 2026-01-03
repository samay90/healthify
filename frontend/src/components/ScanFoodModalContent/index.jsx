import { Camera, Plus, ScanHeart, Upload } from "lucide-react"
import ButtonPrimary from "../ButtonPrimary"
import "./style.scss"
import { useContext, useEffect, useState } from "react";
import ButtonSecondary from "../ButtonSecondary";
import { modalContext } from "../../store/modal";
import AddFoodModalContent from "../AddFoodModalContent";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/client";
import { message } from "../Toast";
const ScanFoodModalContent = () =>{
    const [image,setImage] = useState(null);
    const [url,setUrl] = useState(null);
    const {openModal,closeModal} = useContext(modalContext);
    const {mutate,isPending} = useMutation({
        mutationFn: (data) => api.post('/user/detect-food', data,{
            headers: {"Content-Type":"multipart/form-data"}
        }),
        onSuccess: (data) => {
            message.success("Found Image!");
            openModal(<AddFoodModalContent image={image} initData={data.data.data}/>)            
        },
        onError: (error) => {
            message.error(error.response.data.message);
        }
    })
    useEffect(()=>{
        if (image){
            const objURL = URL.createObjectURL(image);
            setUrl(objURL);
            return () => URL.revokeObjectURL(objURL);
        }else{
            setUrl(null);
        }
    },[image])

    const handleManully = () => {
        openModal(<AddFoodModalContent/>)
    }
    const handleSubmit = () =>{
        if (image){
            const fd = new FormData();
            fd.append("image",image);
            mutate(fd);            
        }
    }
    return (
        <div className="add_food_item">
        <div className="header">
            <h2>Scan Food</h2>
        </div>
        <div className="form">
            <div className="food_image_upload">
                <input multiple={false} onChange={(e)=>setImage(e.target.files[0])} type="file" accept="image/*" ></input>
                <div className="overlay">
                    <span><Camera/> Take Photo</span>
                    <span><Upload/> Upload</span>
                </div>
                <div className="image_overlay">
                    {url?<img src={url}></img>:""}
                </div>
            </div>
            <ButtonSecondary onClick={handleManully} text={<><Plus color="white"/>&nbsp; Add Manually</>} />
            <ButtonPrimary onClick={handleSubmit} disabled={isPending} text={<><ScanHeart color="white"/>&nbsp; Scan Food</>} />
        </div>
    </div>
    )
}

export default ScanFoodModalContent