import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { motion } from "framer-motion";
import { useContext } from "react";
import { Bars } from "react-loader-spinner";
import { BlurContext } from "../../../contexts/global";
import { loadingBarsStyle } from "./AccountWidget";
import { CategoryTypes } from "./BrowseContainer";
import "./Sass/CategoryMenu.scss";

interface CategoryMenuProps{
    categoryDB: CategoryTypes[],
    setCategory: React.Dispatch<React.SetStateAction<number | null>>,
    category: number | null,
    setError: React.Dispatch<React.SetStateAction<{
        state: boolean;
        message: string;
    }>>,
    error: {
        state: boolean;
        message: string;
    },
    catCollapsed: boolean,
    setCatCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const arrowSXProps = {
    fontSize: "32px",
    boxShadow: "0px 0px 5px grey",
    backgroundColor: "#0b0b0c",
}

const CategoryMenu = (props: CategoryMenuProps)=>{

    let {
        categoryDB,
        setCategory, 
        category,
        setError, 
        error,
        catCollapsed,
        setCatCollapsed,
        isLoading,
        setIsLoading,
    } = props

    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    const handleChangeCategory = (index: number)=>{
        setCategory(index)
    }

    return(
        <motion.div id="category-menu-container"
            animate={{
                width: catCollapsed ? "2.5%" : "20%",
                height: catCollapsed ? "5%" : "90%"
            }}
            transition={{ duration: 0.5, type: "tween" }}
            style={{
                justifyContent: catCollapsed ? "center" : "flex-start",
                alignItems: catCollapsed ? "center" : "flex-start"
            }}
        >
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}>
                {
                    catCollapsed ?
                        <ArrowCircleRightIcon
                            className="arrow-icon"
                            tabIndex={0}
                            onClick={
                                blur
                                ? ()=>{}
                                : ()=>{setCatCollapsed(!catCollapsed)}
                            }
                            sx={arrowSXProps}
                        />
                    :
                        <ArrowCircleLeftIcon
                            className="arrow-icon"
                            tabIndex={0}
                            onClick={
                                blur
                                ? ()=>{}
                                : ()=>{setCatCollapsed(!catCollapsed)}
                            }
                            sx={arrowSXProps}
                        />
                }

                {
                    error && !catCollapsed ?
                        <span className="error-msg">{error.message}</span>
                    :
                        null
                }

                {
                    isLoading && !catCollapsed ?
                        <Bars
                            height={loadingBarsStyle.height}
                            width={loadingBarsStyle.width}
                            color={loadingBarsStyle.color}
                        />
                    :
                        null
                }
            </div>
            <span 
                className='spaced-span white-on-black'
                style={{display: catCollapsed ? "none" : "inherit"}}
            >Categories:</span>
            <ul id="category-ul"
                style={{
                    display: catCollapsed ? "none" : "flex"
                }}
            >
                {
                    categoryDB.map((element, index)=>{
                        return(
                            <li 
                                className="category-list-item"
                                key={`category-${element.category_id}`}
                                tabIndex={0}
                                style={{
                                    backgroundColor: category === index ? "#01B763" : "inherit",
                                    boxShadow: category === index ? "inset 0px 0px 10px black" : "none"
                                }}
                                onClick={
                                    blur 
                                    ? ()=>{} 
                                    : ()=>{handleChangeCategory(index)}
                                }
                            >
                                <span className="category-name">
                                    {element.category_name}
                                </span>   
                            </li>
                        )
                    })
                }
            </ul>
        </motion.div>
    )
}

export default CategoryMenu