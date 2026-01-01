import "./style.scss";

const ButtonPrimary = ({text,className,onClick,type="button",disabled=false}) => {
    return <>
        <button className={`btn_primary ${className??""}`} onClick={onClick} type={type} disabled={disabled}>
            {disabled?<span className="loader"></span>:text}
        </button>
    </>
}

export default ButtonPrimary;