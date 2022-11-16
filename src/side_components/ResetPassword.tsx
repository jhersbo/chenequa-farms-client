import "./Sass/ResetPassword.scss"
import "../main_site_components/main_container_components/minor_components/micro_components/Sass/AccountWidget.scss"

import { TextField } from "@mui/material"
import { Bars } from "react-loader-spinner"

import { textFieldSXProps, loadingBarsStyle } from "../main_site_components/main_container_components/minor_components/micro_components/AccountWidget"
import { serverURL } from "../App"
import { useState } from "react"

const ResetPassword = ()=>{

    const [ emailInput, setEmailInput ] = useState("")
    const [ password_1, setPassword_1 ] = useState("")
    const [ password_2, setPassword_2 ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [ recoverySuccess, setRecoverySuccess ] = useState(false)
    const [ validationError, setValidationError ] = useState({state: false, message: ""})

    //starts slicing after '/forgot-password/'
    const parsedToken = window.location.pathname.slice(17)
    console.log(parsedToken)

    const updateEmailInput = (event: any)=>{
        setEmailInput(event.target.value)
    }

    const updatePassword_1Input = (event: any)=>{
        setValidationError({state: false, message: ""})
        setPassword_1(event.target.value)
    }

    const updatePassword_2Input = (event: any)=>{
        setValidationError({state: false, message: ""})
        setPassword_2(event.target.value)
    }

    const submitPasswordUpdate = async ()=>{
        setIsLoading(true)
        let passwordsMatch = password_1 === password_2;

        if(!passwordsMatch){
            setIsLoading(false)
            setValidationError({state: true, message: "Passwords do not match."})
            return
        }

        let response = await fetch(serverURL + "user_auth/forgot-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email_address: emailInput,
                password_hash: password_1,
                reset_password_token: parsedToken
            })
        })

        let parsedResponse = await response.json()
        console.log(parsedResponse)

        if(!parsedResponse.success){
            setIsLoading(false)
            setValidationError({state: true, message: "Password update failed. Please request another reset email."})
            return
        }
        setRecoverySuccess(true)
        setIsLoading(false)
        return
    }

    return(
        <div id="reset-container">
            <div id="reset-form">
                <header id="reset-header">
                    <h3>Reset your password</h3>
                    {
                        recoverySuccess ?
                            <h5 id="success-message">
                                Success!
                            </h5>
                        :
                            null
                    } 
                    {
                        isLoading ?
                            <Bars
                                height={loadingBarsStyle.height}
                                width={loadingBarsStyle.width}
                                color={loadingBarsStyle.color}
                            />
                        :
                            null
                    }
                </header>
                <TextField
                    id="email-input"
                    className="form-fields"
                    label="Email address"
                    onChange={(e)=>{updateEmailInput(e)}}
                    sx={textFieldSXProps}
                />
                <TextField
                    className="password-input form-fields"
                    type="password"
                    label={!validationError.state ? "Password" : validationError.message}
                    onChange={(e)=>{updatePassword_1Input(e)}}
                    sx={textFieldSXProps}
                />
                <TextField
                    className="password-input form-fields"
                    type="password"
                    label={!validationError.state ? "Confirm password" : validationError.message}
                    onChange={(e)=>{updatePassword_2Input(e)}}
                    sx={textFieldSXProps}
                />
                {
                    validationError.state ? 
                        <h5>
                            {validationError.message}
                        </h5>
                    :
                        null
                }
                <div id="reset-btn-container">
                    <button 
                        className="widget-btn login-reg-submit"
                        disabled={isLoading ? true : false}
                        onClick={()=>{submitPasswordUpdate()}}>
                            {
                                recoverySuccess ? 
                                    "Password updated!"
                                :
                                    "Submit"
                            }
                    </button>
                    <button 
                        className="widget-btn login-reg-submit"
                        onClick={()=>{window.location.href = "/"}}>
                        Back to the main site
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword