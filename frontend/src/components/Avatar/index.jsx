import "./style.scss"

const Avatar = ({url,children,chr,size}) =>{
    return (
        <div className="avatar" style={{width:size+"px",height:size+"px"}}>
            <>
                {children}
            </>
            {url?<img src={url} alt="" />:<span style={{fontSize:1/40*size+"rem"}}>{chr.replace(" ","").charAt(0).toUpperCase()}</span>}
        </div>
    )
}

export default Avatar