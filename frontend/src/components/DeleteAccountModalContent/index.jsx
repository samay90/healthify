import { useContext } from "react";
import ButtonPrimary from "../ButtonPrimary"
import ButtonSecondary from "../ButtonSecondary"
import "./style.scss"
import { modalContext } from "../../store/modal";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/client";
import { message } from "../Toast";
const DeleteAccountModalContent = () =>{
    const {closeModal} = useContext(modalContext);

    const {mutate,isPending} = useMutation({
        mutationFn: (data) => api.delete('/user/delete-account', data),
        onSuccess: (data) => {
            message.success("Account Deleted!");
            window.location.reload();
            setEdit(false);
        },
        onError: (error) => {
            message.error(error.response.data.message);
        }
    })
    
    const handleDelete = () =>{
        mutate();
    }
    
    return <div className="delete_acc_modal_content">
        <h1>Delete Account</h1>
        <p>Are you sure you want to delete your account?</p>
        <div className="buttons">
            <ButtonSecondary disabled={isPending} className="secondary" onClick={closeModal} text={"Cancel"}></ButtonSecondary>
            <ButtonPrimary onClick={handleDelete} disabled={isPending} className="primary" text={"Delete"}></ButtonPrimary>
        </div>
    </div>
}

export default DeleteAccountModalContent