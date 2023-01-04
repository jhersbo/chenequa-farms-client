import { useContext } from "react"
import { BlurContext } from "../../../../contexts/global"


const SearchBar = ()=>{

    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    return(
        <div style={blurCXT?.payload} id="searchbar-container">
            <h3>
                Searchbar
            </h3>
        </div>
    )
}

export default SearchBar