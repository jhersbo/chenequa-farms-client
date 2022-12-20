import "./Sass/AccountWidget.scss"

import { useContext, useState } from "react"
import { UserContext, BlurContext } from "../../../contexts/global"
import { serverURL } from "../../../App"
import Cookies from "js-cookie"
import { cookieConfig } from "../../../App"

import { styled, TextField } from "@mui/material"

import LoginForm from "./micro_components/LoginForm"
import RegForm from "./micro_components/RegForm"
import ForgotPassForm from "./micro_components/ForgotPassForm"
import AccountScreen from "./micro_components/AccountScreen"


export const textFieldSXProps = {
    marginBottom: "0.5rem",
    width: "100%",
    // border: "1px solid #0b0b0c",
    borderRadius: "5px",
    // boxShadow: "1px 1px 2px #0b0b0c"
}

export const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#01B763',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: '#01B763',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#01B763',
        },
    },
})

export const loadingBarsStyle = {
    height: "40",
    width: "40",
    color: "#01B763",
    ariaLabel: "bars-loading"
}

interface AccountWidgetProps{

}

const AccountWidget = (props: AccountWidgetProps)=>{

    const [ loginState, setLoginState ] = useState(false)
    const [ regState, setRegState ] = useState(false)
    const [ accountScreen, setAccountScreen ] = useState(false)

    const [ emailInput, setEmailInput ] = useState("")
    const [ phoneNumber, setPhoneNumber ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ password_1, setPassword_1 ] = useState("")
    const [ password_2, setPassword_2 ] = useState("")
    const [ forgotPassword, setForgotPassword ] = useState(false)
    const [ recoverySuccess, setRecoverySuccess ] = useState(false)
    const [ validationError, setValidationError ] = useState({state: false, message: ""})

    const [ isLoading, setIsLoading ] = useState(false)
    
    const userCXT = useContext(UserContext)
    let user = userCXT.value

    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    const handleSignOut = ()=>{
        userCXT.setUser(null)
        setEmailInput("")
        setPassword_1("")
        Cookies.remove("user")
        Cookies.remove("token")
    }

    const handleSwitchToLogin = ()=>{
        setLoginState(true)
        setRegState(false)
        blurCXT?.setBlur(true)
    }

    const handleSwitchToReg = ()=>{
        setRegState(true)
        setLoginState(false)
        blurCXT?.setBlur(true)
    }

    const handleLoginSubmit = async ()=>{
        setIsLoading(true)

        let emailOmit = emailInput === ""
        let passWordOmit = password_1 === ""

        if(emailOmit || passWordOmit){
            setValidationError({state: true, message: "Please fill out all required fields."})
            setIsLoading(false)
            return
        }

        try{
            let response = await fetch(serverURL + "user_auth/auth",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email_address: emailInput,
                    password_hash: password_1
                })
            })
            let parsedResponse = await response.json()
            console.log(parsedResponse)
    
            if(!parsedResponse.success){
                setIsLoading(false)
                setValidationError({state: true, message: "Unable to log in. Please check your login credentials."})
                return
            }
            
            let token = parsedResponse.data.token

            delete parsedResponse.data.token

            userCXT.setUser(parsedResponse.data)
            Cookies.set("user", JSON.stringify(parsedResponse.data), cookieConfig.user)
            Cookies.set("token", JSON.stringify(token), cookieConfig.jwt)
            setIsLoading(false)
            setLoginState(false)
            setRegState(false)
            blurCXT?.setBlur(false)
            window.location.href = "/"
            return
        }catch(err){
            setValidationError({state: true, message: "Error connecting to the server."})
            setIsLoading(false)
            return
        }
    }

    const handleRegistration = async ()=>{
        setIsLoading(true)

        let emailOmit = emailInput === ""
        let firstNameOmit = firstName === ""
        let lastNameOmit = lastName === ""
        let passWordOmit = password_1 === "" || password_2 === ""

        if(emailOmit || firstNameOmit || lastNameOmit || passWordOmit){
            setValidationError({state: true, message: "Please fill out all required fields."})
            setIsLoading(false)
            return
        }

        let passwordsMatch = password_1 === password_2;

        if(!passwordsMatch){
            setValidationError({state: true, message: "Passwords do not match"})
            return
        }

        try{
            let response = await fetch(serverURL + "user_auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email_address: emailInput,
                    phone_number: phoneNumber,
                    first_name: firstName,
                    last_name: lastName,
                    password_hash: password_1
                })
            })
    
            let parsedResponse = await response.json()
    
            if(!parsedResponse.success){
                setIsLoading(false)
                setValidationError({state: true, message: "Unable to create account. Please check your credentials."})
                return
            }
            let token = parsedResponse.data.token

            delete parsedResponse.data.token

            userCXT.setUser(parsedResponse.data)
            Cookies.set("user", JSON.stringify(parsedResponse.data), cookieConfig.user)
            Cookies.set("token", JSON.stringify(token), cookieConfig.jwt)
            setIsLoading(false)
            setLoginState(false)
            setRegState(false)
            blurCXT?.setBlur(false)
            window.location.href = "/"
            return
        }catch(err){
            setValidationError({state: true, message: "Error connecting to the server."})
            setIsLoading(false)
            return
        }
    }

    const updateEmailInput = (event: any)=>{
        setValidationError({state: false, message: ""})
        setEmailInput(event.target.value)
    }

    const updatePhoneInput = (event: any)=>{
        setValidationError({state: false, message: ""})
        setPhoneNumber(event.target.value)
    }

    const updateFirstNameInput = (event: any)=>{
        setValidationError({state: false, message: ""})
        setFirstName(event.target.value)
    }

    const updateLastNameInput = (event: any)=>{
        setValidationError({state: false, message: ""})
        setLastName(event.target.value)
    }

    const updatePassword_1Input = (event: any)=>{
        setValidationError({state: false, message: ""})
        setPassword_1(event.target.value)
    }

    const updatePassword_2Input = (event: any)=>{
        setValidationError({state: false, message: ""})
        setPassword_2(event.target.value)
    }

    const handleForgotPasswordState = ()=>{
        setValidationError({state: false, message: ""})
        setLoginState(false)
        setRegState(false)
        setForgotPassword(true)
    }

    const handleSendRecoveryEmail = async ()=>{
        
        setIsLoading(true)

        if(emailInput === ""){
            setIsLoading(false)
            setValidationError({state: true, message: "Your email address is required."})
            return
        }

        try{
            let response = await fetch(serverURL + "user_auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email_address: emailInput
                })
            })
    
            let parsedResponse = await response.json()
            
            console.log(parsedResponse)

            if(!parsedResponse.success){
                setIsLoading(false)
                setValidationError({state: true, message: "Unable to send password reset email. Please check to be sure your email address is correct."})
                return
            }
    
            setRecoverySuccess(true)
            setIsLoading(false)
            setLoginState(false)
            setRegState(false)
            return
        }catch(err){
            setValidationError({state: true, message: "Error connecting to the server."})
            setIsLoading(false)
            return
        }
    }

    const handleCloseBtn = ()=>{
        setForgotPassword(false)
        setRecoverySuccess(false)
        setIsLoading(false)
        setLoginState(false)
        setRegState(false)
        setAccountScreen(false)
        blurCXT?.setBlur(false)
    }

    const handleSwitchToAccount = ()=>{
        blurCXT?.setBlur(true)
        setAccountScreen(true)
    }

    if(loginState && !regState){
        return(
            <LoginForm
                loadingBarsStyle={loadingBarsStyle}
                isLoading={isLoading}
                validationError={validationError}
                textFieldSXProps={textFieldSXProps}
                handleCloseBtn={handleCloseBtn}
                updateEmailInput={updateEmailInput}
                updatePassword_1Input={updatePassword_1Input}
                handleLoginSubmit={handleLoginSubmit}
                handleForgotPasswordState={handleForgotPasswordState}
                handleSwitchToReg={handleSwitchToReg}
            />
        )
    }else if(!loginState && regState){
        return(
            <RegForm
                loadingBarsStyle={loadingBarsStyle}
                isLoading={isLoading}
                validationError={validationError}
                textFieldSXProps={textFieldSXProps}
                handleCloseBtn={handleCloseBtn}
                updateEmailInput={updateEmailInput}
                updatePhoneInput={updatePhoneInput}
                updatePassword_1Input={updatePassword_1Input}
                handleLoginSubmit={handleLoginSubmit}
                handleForgotPasswordState={handleForgotPasswordState}
                handleSwitchToReg={handleSwitchToReg}
                updateFirstNameInput={updateFirstNameInput}
                updateLastNameInput={updateLastNameInput}
                updatePassword_2Input={updatePassword_2Input}
                handleRegistration={handleRegistration}
                handleSwitchToLogin={handleSwitchToLogin}  
            />
        )
    }else if(forgotPassword){
        return(
            <ForgotPassForm
                loadingBarsStyle={loadingBarsStyle}
                textFieldSXProps={textFieldSXProps}
                isLoading={isLoading}
                validationError={validationError}
                handleCloseBtn={handleCloseBtn}
                updateEmailInput={updateEmailInput}
                handleSendRecoveryEmail={handleSendRecoveryEmail}
                recoverySuccess={recoverySuccess}
            />
        )
    }else if (accountScreen){
        return(
            <AccountScreen handleCloseBtn={handleCloseBtn}/>
        )
    }else{
        return(
            <div className="widget-container">
                {
                    user ?
                        <div id="signed-in-container">
                            <div>
                                <h5 id="greeting">
                                    Welcome,&nbsp;{user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}
                                </h5>
                                {
                                    user.is_admin ?
                                        <em className="alert">Administrator</em>
                                    :
                                        null
                                }
                            </div>
                            <div className="btn-container">
                                <button className="widget-btn collapsed-widget" aria-label="log out" onClick={()=>{handleSignOut()}}>Log Out</button>
                                <button className="widget-btn collapsed-widget" aria-label="account" onClick={()=>{handleSwitchToAccount()}}>Account</button>
                            </div>
                        </div>
                    :
                        <div id="signed-in-container">
                            <div>
                                <h5 id="greeting">
                                    Welcome, guest.
                                </h5>
                            </div>
                            <div className="btn-container">
                                <button className="widget-btn" aria-label="log in" onClick={()=>{handleSwitchToLogin()}}>Log In</button>
                                <button className="widget-btn" aria-label="register" onClick={()=>{handleSwitchToReg()}}>Register</button>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default AccountWidget