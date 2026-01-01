import "./style.scss"

const Avatar = ({url,chr,size}) =>{
    return (
        <div className="avatar" style={{width:size+"px",height:size+"px"}}>
            {url?<img src={url} alt="" />:<span>{chr.replace(" ","").charAt(0).toUpperCase()}</span>}
        </div>
    )
}

export default Avatar