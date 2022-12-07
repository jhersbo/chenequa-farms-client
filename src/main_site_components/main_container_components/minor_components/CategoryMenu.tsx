import "./Sass/CategoryMenu.scss"

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Bars } from "react-loader-spinner"
import { loadingBarsStyle } from "./AccountWidget";

import { CategoryTypes } from "./BrowseContainer"

import { motion } from "framer-motion"
import { useState, useContext } from "react";

import { BlurContext } from "../../../contexts/global";

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
    fontSize: "38px",
    boxShadow: "0px 0px 5px grey",
    backgroundColor: "#0b0b0c"
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
                width: catCollapsed ? "2.5vw" : "20vw"
            }}
            transition={{ duration: 0.5, type: "tween" }}
        >
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                {
                    catCollapsed ?
                        <ArrowCircleRightIcon
                            className="arrow-icon"
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
                        <h5 style={{
                            margin: "0em",
                            color: "red"
                        }}>{error.message}</h5>
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
                                style={{
                                    backgroundColor: category === index ? "#01B763" : "inherit",
                                }}
                                onClick={
                                    blur 
                                    ? ()=>{} 
                                    : ()=>{handleChangeCategory(index)}
                                }
                            >
                                <img 
                                    src={element.category_thumbnail} 
                                    alt={element.category_name + "category image"}
                                    className="category-img"
                                />
                                <div className="category-name-desc">
                                    <h3 className="category-name">
                                        {element.category_name}
                                    </h3>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </motion.div>
    )
}

export default CategoryMenu