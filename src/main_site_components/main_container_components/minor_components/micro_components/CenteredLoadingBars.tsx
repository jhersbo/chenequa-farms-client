import { Bars } from "react-loader-spinner"
import "./Sass/CenteredLoadingBars.scss";

const CenteredLoadingBars = ()=>{
    return(
        <div 
            className="static-centered"
        >
            <Bars/>
        </div>
    )
}

export default CenteredLoadingBars