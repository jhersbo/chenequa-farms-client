import "./Sass/AccountWidget.scss"

import { useContext, useState } from "react"
import { UserContext, UserContextInterface } from "../../../../contexts/global"
import { serverURL } from "../../../../App"
import Cookies from "js-cookie"

import TextField from '@mui/material/TextField';

interface AccountWidgetProps{
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>,
    loginState: boolean,
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>
    regState: boolean,
    setRegState: React.Dispatch<React.SetStateAction<boolean>>,
    setBlur: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountWidget = ({ setUser, loginState, setLoginState, regState, setRegState, setBlur }: AccountWidgetProps)=>{

    const [ validationError, setValidationError ] = useState({state: false, message: ""})
    
    const [ emailInput, setEmailInput ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ password_1, setPassword_1 ] = useState("")
    const [ password_2, setPassword_2 ] = useState("")
    const [ forgotPassword, setForgotPassword ] = useState(false)

    const textFieldSXProps = {
        marginBottom: "0.5rem",
        width: "100%"
    }

    const user = useContext(UserContext)

    const handleSignOut = ()=>{
        setUser(null)
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
            setValidationError({state: true, message: "Unable to log in. Please check your login credentials."})
            return
        }

        setUser(parsedResponse.data)
        Cookies.set("user", JSON.stringify(parsedResponse.data))
        setLoginState(false)
        setRegState(false)
        setBlur(false)
        return
    }

    const updateEmailInput = (event: any)=>{
        setEmailInput(event.target.value)
    }

    const updateFirstNameInput = (event: any)=>{

    }

    const updateLastNameInput = (event: any)=>{
        
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
        setLoginState(false)
        setRegState(false)
        setForgotPassword(true)
    }



    if(loginState && !regState){
        return(
            <div id="login-container">
                <h3>Login</h3>
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
                        <button onClick={()=>{handleLoginSubmit()}}>Login</button>
                        {
                            validationError.state ?
                                <button onClick={()=>{handleForgotPasswordState()}}>
                                    Forgot your password?
                                </button>
                            :
                                null
                        }
                        <button onClick={()=>{handleSwitchToReg()}}>Register</button>
                    </div>
                </div>
            </div>
        )
    }else if(!loginState && regState){
        return(
            <div id="login-container">
                <h3>Register</h3>
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
                    <div id="login-btn-container">
                        <button>Register</button>
                        <button onClick={()=>{handleSwitchToLogin()}}>Have an account?</button>
                    </div>
                </div>
            </div>
        )
    }else if(forgotPassword){
        return(
            <div id="login-container">
                <h3>
                    Forgot your password?
                </h3>
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