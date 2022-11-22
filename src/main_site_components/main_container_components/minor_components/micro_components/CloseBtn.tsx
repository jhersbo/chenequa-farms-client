import "../Sass/AccountWidget.scss";

import CloseIcon from '@mui/icons-material/Close';

export const closeIconSXProps = {
    fontSize: "28px"
}

interface CloseBtnProps{
    handleCloseBtn: ()=> void
}

const CloseBtn = (props: CloseBtnProps)=>{

    let {
        handleCloseBtn
    } = props

    return(
        <button 
            className="close-btn"
            onClick={()=>{handleCloseBtn()}}>
            <CloseIcon sx={closeIconSXProps}/>
        </button>
    )
}

export default CloseBtn