import { Camera, FolderClosed, Mail, Pen, Target, Trash2, User } from "lucide-react"
import ButtonPrimary from "../../components/ButtonPrimary"
import Card from "../../components/Card"
import Avatar from "../../components/Avatar"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../store/User"
import "../../styles/profile.scss"
import Input from "../../components/Input"
import ButtonSecondary from "../../components/ButtonSecondary"
import { useMutation } from "@tanstack/react-query"
import api from "../../api/client"
import { message } from "../../components/Toast"
import { queryClient } from "../../main"
import { modalContext } from "../../store/modal"
import DeleteAccountModalContent from "../../components/DeleteAccountModalContent"

const Profile = () =>{
    const {data:user} = useContext(userContext);
    const [new_user,setNew_user] = useState(user);
    const [edit,setEdit] = useState(false);
    const [image,setImage] =  useState(null);
    const [deleteImage,setDeleteImage] = useState(false);
    const [image_url,setImage_url] = useState("");
    const {mutate,isPending} = useMutation({
        mutationFn: (data) => api.post('/user/update', data,{
            headers: {"Content-Type":"multipart/form-data"}
        }),
        onSuccess: (data) => {
            message.success("Updated Successfully!");
            window.location.reload();
            setEdit(false);
        },
        onError: (error) => {
            message.error(error.response.data.message);
        }
    })
    useEffect(()=>{
        if (image){
            const objURL = URL.createObjectURL(image);
            setImage_url(objURL);
            return () => URL.revokeObjectURL(objURL);
        }
    },[image])
    const handleSave = () =>{
        const fd = new FormData();
        fd.append("name",new_user.name);
        fd.append("profile",image);
        if (deleteImage) fd.append("delete_pic","yes");
        else fd.append("delete_pic","");
        fd.append("daily_calorie_limit",new_user.daily_calorie_limit);
        fd.append("daily_protein_limit",new_user.daily_protein_limit);
        fd.append("daily_carbs_limit",new_user.daily_carbs_limit);
        fd.append("daily_fats_limit",new_user.daily_fats_limit);
        mutate(fd);
    }
    const handleDelete = () => {
        setDeleteImage(true);
        setImage(null);
        setImage_url("");
    }
    const {openModal} = useContext(modalContext);
    const handleDeleteAccount = () =>{
        openModal(<DeleteAccountModalContent/>);
    }
    return <div className="page_in profile_page dashboard_page">
        <div className="greetings">
            <div>
            <h1>Profile</h1>
            <p>Manage your account settings</p>
            </div>
            <div className="buttons">
                {
                    !edit?
                    <ButtonPrimary onClick={()=>setEdit(true)} className={"button"} text={<><Pen size={18} color="white"/>&nbsp;&nbsp;Edit Profile</>}></ButtonPrimary>
                    :
                    <>
                        <ButtonSecondary disabled={isPending} onClick={()=>setEdit(false)} className={"button"} text={<>Cancel</>}></ButtonSecondary>
                        <ButtonPrimary disabled={isPending} onClick={handleSave} className={"button"} text={<><FolderClosed size={18} color="white"/>&nbsp;&nbsp;Save</>}></ButtonPrimary>
                    </>
                }
            </div>
        </div>
        <div className="profile_area">
            <Card className="user_card">
                <div className="icon">
                    <Avatar size={100} url={image_url||user.pic} chr={user.name}>
                        {
                            edit?<><input type="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                        <div className="buttons">
                            <span onClick={handleDelete}><Trash2 size={18}/></span>
                            <span><Camera size={18}/></span>
                        </div></>:""
                        }
                    </Avatar>
                </div>
                <div className="user_info">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </Card>
            <Card className={"sections"}>
                <div className="header">
                    <h3>Presonal Information</h3>
                </div>
                <div className="form">
                    <Input 
                    disabled={!edit}
                    field_name={
                        <><User size={18} color="rgb(var(--text-dark))"/> Full Name</>
                    }
                    placeholder={"Alex Johnson"}
                    value={new_user.name}
                    onChange={(e)=>{
                        setNew_user({...new_user,name:e.target.value})
                    }}
                    ></Input>
                    <Input 
                    disabled
                    field_name={
                        <><Mail size={18} color="rgb(var(--text-dark))"/> Email</>
                    }
                    value={new_user.email}
                    ></Input>
                </div>
            </Card>
            <Card className={"sections"}>
                <div className="header">
                    <h3><Target/> Daily Nuritions Goal</h3>
                </div>
                <div className="form">
                    <Input 
                    disabled={!edit}
                    field_name={
                        <>Calories (kcal)</>
                    }
                    placeholder={"2000"}
                    value={new_user.daily_calorie_limit}
                    onChange={(e)=>{
                        setNew_user({...new_user,daily_calorie_limit:e.target.value})
                    }}
                    ></Input>
                    <Input 
                    disabled={!edit}
                    field_name={
                        <>Protein (g)</>
                    }
                    placeholder={"120"}
                    value={new_user.daily_protein_limit}
                    onChange={(e)=>{
                        setNew_user({...new_user,daily_protein_limit:e.target.value})
                    }}
                    ></Input>
                    <Input 
                    disabled={!edit}
                    placeholder={"200"}
                    field_name={
                        <>Carbs (g)</>
                    }
                    value={new_user.daily_carbs_limit}
                    onChange={(e)=>{
                        setNew_user({...new_user,daily_carbs_limit:e.target.value})
                    }}
                    ></Input>
                    <Input 
                    disabled={!edit}
                    placeholder={"60"}
                    field_name={
                        <>Fats (g)</>
                    }
                    value={new_user.daily_fats_limit}
                    onChange={(e)=>{
                        setNew_user({...new_user,daily_fats_limit:e.target.value})
                    }}
                    ></Input>
                </div>
            </Card>
            <Card className={"sections delete_account"}>
                <div className="header">
                    <h3><Trash2/> Delete Account</h3>
                </div>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <ButtonPrimary onClick={handleDeleteAccount} className="button" text={<>Delete Account</>} ></ButtonPrimary>
            </Card>
        </div>
    </div>
}

export default Profile