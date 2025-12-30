import { useEffect, useRef, useState } from "react";
import Logo from "../Logo"
import "./style.scss"
const Loading = () =>{
    return (
        <div className="loading_main">
            <Logo full/>
            <span className="spinner"></span>
        </div>
    )
}

export default Loading