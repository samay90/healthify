import { createContext, useState } from "react";


export const modalContext = createContext(null);


export const ModalProvider = ({children,value}) => {
    const [isOpen,setOpen] = useState(false)
    const [content,setContent] = useState();

    const openModal = (content) => {
        setContent(content);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };
    return (
        <modalContext.Provider value={
            {
                isOpen,
                children:content,
                openModal,
                closeModal
            }
        }>
            {children}
        </modalContext.Provider>
    )
}
