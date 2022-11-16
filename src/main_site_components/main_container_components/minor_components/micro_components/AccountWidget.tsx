import "./Sass/AccountWidget.scss"

import { useContext, useState } from "react"
import { UserContext, UserContextInterface } from "../../../../contexts/global"
import { serverURL } from "../../../../App"
import Cookies from "js-cookie"

import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { Bars } from "react-loader-spinner"

export const textFieldSXProps = {
    marginBottom: "0.5rem",
    width: "100%"
}

export const closeIconSXProps = {
    fontSize: "28px"
}

export const loadingBarsStyle = {
    height: "40",
    width: "40",
    color: "#005B31",
    ariaLabel: "bars-loading"
}

interface AccountWidgetProps{
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>,
    loginState: boolean,
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>
    regState: boolean,
    setRegState: React.Dispatch<React.SetStateAction<boolean>>,
    setBlur: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountWidget = ({ setUser, loginState, setLoginState, regState, setRegState, setBlur }: AccountWidgetProps)=>{
    
    const [ emailInput, setEmailInput ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ password_1, setPassword_1 ] = useState("")
    const [ password_2, setPassword_2 ] = useState("")
    const [ forgotPassword, setForgotPassword ] = useState(false)
    const [ recoverySuccess, setRecoverySuccess ] = useState(false)
    const [ validationError, setValidationError ] = useState({state: false, message: ""})

    const [ isLoading, setIsLoading ] = useState(false)
    
    const user = useContext(UserContext)

    const handleSignOut = ()=>{
        setUser(null)
        setEmailInput("")
        setPassword_1("")
        Cookies.set("user", "")
    }

    const handleSwitchToLogin = ()=>{
        setLoginState(true)
        setRegState(false)
    }

    const handleSwitchToReg = ()=>{
        setRegState(true)
        setLoginState(false)
    }

    const handleLoginSubmit = async ()=>{

        setIsLoading(true)

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

        setUser(parsedResponse.data)
        Cookies.set("user", JSON.stringify(parsedResponse.data))
        setIsLoading(false)
        setLoginState(false)
        setRegState(false)
        setBlur(false)
        return
    }

    const handleRegistration = async ()=>{

        setIsLoading(true)

        let passwordsMatch = password_1 === password_2;

        if(!passwordsMatch){
            setValidationError({state: true, message: "Passwords do not match"})
            return
        }

        let response = await fetch(serverURL + "user_auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email_address: emailInput,
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

        setUser(parsedResponse.data)
        Cookies.set("user", JSON.stringify(parsedResponse.data))
        setIsLoading(false)
        setLoginState(false)
        setRegState(false)
        setBlur(false)
        return
    }

    const updateEmailInput = (event: any)=>{
        setEmailInput(event.target.value)
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
    }

    const handleCloseBtn = ()=>{
        setForgotPassword(false)
        setRecoverySuccess(false)
        setIsLoading(false)
        setLoginState(false)
        setRegState(false)
        setBlur(false)
    }

    if(loginState && !regState){
        return(
            <div id="login-container">
                <button 
                    className="close-btn"
                    onClick={()=>{handleCloseBtn()}}>
                    <CloseIcon sx={closeIconSXProps}/>
                </button>
                <header id="login-reg-header">
                    <h3>Login</h3>
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
                <div id="login-form-container">
                    <TextField
                        id="email-input"
                        label="Email address"
                        onChange={(e)=>{updateEmailInput(e)}}
                        sx={textFieldSXProps}
                    />
                    <TextField
                        className="password-input"
                        type="password"
                        label="Password"
                        onChange={(e)=>{updatePassword_1Input(e)}}
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
                    <div id="login-btn-container">
                        <button 
                            className="widget-btn login-reg-submit" 
                            onClick={()=>{handleLoginSubmit()}}
                            disabled={isLoading ? true : false}>
                                Login
                        </button>
                        {
                            validationError.state ?
                                <button className="widget-btn" onClick={()=>{handleForgotPasswordState()}}
                                disabled={isLoading ? true : false}>
                                    Forgot your password?
                                </button>
                            :
                                null
                        }
                        <button 
                            className="widget-btn login-reg-submit" 
                            onClick={()=>{handleSwitchToReg()}}
                            disabled={isLoading ? true : false}>
                                Register
                        </button>
                    </div>
                </div>
            </div>
        )
    }else if(!loginState && regState){
        return(
            <div id="login-container">
                <button 
                    className="close-btn"
                    onClick={()=>{handleCloseBtn()}}>
                    <CloseIcon sx={closeIconSXProps}/>
                </button>
                <header id="login-reg-header">
                    <h3>Register</h3>
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
                <div id="login-form-container">
                    <TextField
                        id="email-input"
                        className="form-fields"
                        label="Email address"
                        onChange={(e)=>{updateEmailInput(e)}}
                        sx={textFieldSXProps}
                    />
                    <TextField
                        id="first-name-input"
                        className="form-fields"
                        label="First name"
                        onChange={(e)=>{updateFirstNameInput(e)}}
                        sx={textFieldSXProps}
                    />
                    <TextField
                        id="email-input"
                        className="form-fields"
                        label="Last name"
                        onChange={(e)=>{updateLastNameInput(e)}}
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
                    <div id="login-btn-container">
                        <button 
                            className="widget-btn login-reg-submit"
                            onClick={()=>{handleRegistration()}}
                            disabled={isLoading ? true : false}>
                                Register
                        </button>
                        <button 
                            className="widget-btn login-reg-submit" 
                            onClick={()=>{handleSwitchToLogin()}}
                            disabled={isLoading ? true : false}>
                                Have an account?
                        </button>
                    </div>
                </div>
            </div>
        )
    }else if(forgotPassword){
        return(
            <div id="login-container">
                <button 
                    className="close-btn"
                    onClick={()=>{handleCloseBtn()}}>
                    <CloseIcon sx={closeIconSXProps}/>
                </button>
                <header id="login-reg-header">
                    <h3>Forgot your password?</h3>
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
                <h5>Enter your email below and you will receive an email to reset your password.</h5>
                <TextField
                    id="email-input"
                    label="Email address"
                    onChange={(e)=>{updateEmailInput(e)}}
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
                <div id="login-btn-container">
                    <button 
                        className="widget-btn login-reg-submit"
                        disabled={isLoading ? true : false}
                        onClick={()=>{handleSendRecoveryEmail()}}>
                            {
                                recoverySuccess ? 
                                    "Email Sent!"
                                :
                                    "Send Email"
                            }
                    </button>
                </div>
            </div>
        )
    }else{
        return(
            <div className="widget-container">
                {
                    user ?
                        <div id="signed-in-container">
                            <div>
                                <h5 id="greeting">
                                    {"Welcome, " + user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}
                                </h5>
                            </div>
                            <div className="btn-container">
                                <button className="widget-btn" aria-label="log out" onClick={()=>{handleSignOut()}}>Log Out</button>
                                <button className="widget-btn" aria-label="log out">Account</button>
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
                                <button className="widget-btn" aria-label="log out" onClick={()=>{handleSwitchToLogin()}}>Log In</button>
                                <button className="widget-btn" aria-label="log out" onClick={()=>{handleSwitchToReg()}}>Register</button>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default AccountWidget