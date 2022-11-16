import "../Sass/AccountWidget.scss"

import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Bars } from "react-loader-spinner"

interface LoginFormProps{
    loadingBarsStyle: {
        height: string,
        width: string,
        color: string,
        ariaLabel: string
    },
    textFieldSXProps: {
        marginBottom: string,
        width: string,
    },
    closeIconSXProps: {
        fontSize: string
    },
    isLoading: boolean,
    validationError: {
        state: boolean,
        message: string
    },
    handleCloseBtn: () => void,
    updateEmailInput: (event: any) => void,
    updatePassword_1Input: (event: any) => void,
    handleLoginSubmit: () => Promise<void>,
    handleForgotPasswordState: () => void,
    handleSwitchToReg: () => void,
}

const LoginForm = (props: LoginFormProps)=>{
    let { 
        loadingBarsStyle, 
        textFieldSXProps, 
        closeIconSXProps, 
        isLoading, 
        validationError, 
        handleCloseBtn, 
        updateEmailInput, 
        updatePassword_1Input, 
        handleLoginSubmit, 
        handleForgotPasswordState, 
        handleSwitchToReg 
    } = props

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
}

export default LoginForm