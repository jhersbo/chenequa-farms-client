import "../Sass/AccountWidget.scss";

import TextField from '@mui/material/TextField';
import { Bars } from "react-loader-spinner";

import CloseBtn from "./CloseBtn";

interface ForgotPassFormProps{
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
    isLoading: boolean,
    validationError: {
        state: boolean,
        message: string
    },
    handleCloseBtn: () => void,
    updateEmailInput: (event: any) => void,
    handleSendRecoveryEmail: () => Promise<void>
    recoverySuccess: boolean
}

const ForgotPassForm = (props: ForgotPassFormProps)=>{

    let {
        loadingBarsStyle, 
        textFieldSXProps,
        isLoading, 
        validationError,
        handleCloseBtn,
        updateEmailInput,
        handleSendRecoveryEmail, 
        recoverySuccess 

    } = props

    return(
        <div id="login-container">
                <CloseBtn handleCloseBtn={handleCloseBtn}/>
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
                    error={validationError.state}
                    id="email-input"
                    label="Email address"
                    onChange={(e)=>{updateEmailInput(e)}}
                    sx={textFieldSXProps}
                    required
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
}

export default ForgotPassForm