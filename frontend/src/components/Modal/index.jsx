import { Cross, X } from "lucide-react"
import "./style.scss"
import { modalContext } from "../../store/modal";
import { useContext, useEffect, useRef, useState } from "react";
const Modal = () =>{
    const {isOpen,closeModal,children}= useContext(modalContext);
    const modalCover = useRef();
    const modalContent = useRef();
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMove = (e) => {
        setPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);
    useEffect(()=>{
        if (isOpen){
            modalCover.current.style.display = "block";
            modalCover.current.style.zIndex = "99999";
            modalContent.current.style.display = "flex";
            modalContent.current.style.zIndex = "99999";
            modalContent.current.style.top = `${pos.y}px`;
            modalContent.current.style.left = `${pos.x}px`;
            modalContent.current.style.transition = "all 0.3s ease";
            setTimeout(()=>{
                modalCover.current.style.backgroundColor = "rgba(28, 26, 26, 0.5)";
                modalContent.current.style.transform = "translate(-50%,-50%) scale(1)";
                modalContent.current.style.top = "50%";
                modalContent.current.style.left = "50%";
                modalContent.current.style.opacity = "1";
            },20)
        }else{
            modalCover.current.style.backgroundColor = "rgba(28, 26, 26, 0)";
            modalContent.current.style.transform = "translate(-50%,-50%) scale(0)";
            modalContent.current.style.opacity = "0";
            setTimeout(()=>{
                modalCover.current.style.display = "none";
                modalCover.current.style.zIndex = "-1000";
                modalContent.current.style.display = "none";
                modalContent.current.style.zIndex = "-1000";
                modalContent.current.style.transition = "none";
            },320)
        }
    },[isOpen])
    
    return <div className="modal">
        <div ref={modalCover} onClick={closeModal} className="modal_cover"></div>
        <div ref={modalContent} className="modal_content">
            <span className="close" onClick={closeModal}>
                <X size={25}/>
            </span>
            {children}
        </div>
    </div>
}

export default Modal