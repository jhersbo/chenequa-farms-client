interface SearchBarProps{
    blur: boolean
}

const SearchBar = (props: SearchBarProps)=>{
    let { 
        blur 
    } = props

    return(
        <div style={{"filter": blur ? "blur(4px)" : "none"}} id="searchbar-container">
            <h3>
                Searchbar
            </h3>
        </div>
    )
}

export default SearchBar