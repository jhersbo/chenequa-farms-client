import "../Sass/AccountWidget.scss";

import { Bars } from "react-loader-spinner";
import { CustomTextField } from "../AccountWidget";

import CloseBtn from "./CloseBtn";
import WidgetBtn from "./WidgetBtn";

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
            <CloseBtn handleCloseBtn={handleCloseBtn}/>
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
                <CustomTextField
                    data-testid="login-email"
                    error={validationError.state}
                    id="email-input"
                    label="Email address"
                    onChange={(e)=>{updateEmailInput(e)}}
                    sx={textFieldSXProps}
                    required
                />
                <CustomTextField
                    data-testid="login-password"
                    error={validationError.state}
                    className="password-input"
                    type="password"
                    label="Password"
                    onChange={(e)=>{updatePassword_1Input(e)}}
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
                    <WidgetBtn disabledBool={isLoading} action={handleLoginSubmit}>
                        Login
                    </WidgetBtn>
                    {
                        validationError.state ?
                            <WidgetBtn disabledBool={isLoading} action={handleLoginSubmit}>
                                Forgot your password?
                            </WidgetBtn>
                        :
                            null
                    }
                    <WidgetBtn disabledBool={isLoading} action={handleSwitchToReg}>
                        Register
                    </WidgetBtn>
                </div>
            </div>
        </div>
    )
}

export default LoginForm