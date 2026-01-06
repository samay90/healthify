import "./style.scss"

const Spinner = ({className}) => {
    return <div className={"spinner"+" "+className} >
        <span></span>
    </div>
}

export default Spinner