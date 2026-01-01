import "./style.scss";

const ButtonSecondary = ({text,className,color,onClick,type="button",disabled=false}) => {
    return <>
        <button className={`btn_secondary ${className??""}`} style={{"--color":color??"var(--primary-color)"}} onClick={onClick} type={type} disabled={disabled}>
            {disabled?<span className="loader"></span>:text}
        </button>
    </>
}

export default ButtonSecondary;