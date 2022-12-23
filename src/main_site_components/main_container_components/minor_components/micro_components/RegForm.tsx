import "../Sass/AccountWidget.scss";

import { Bars } from "react-loader-spinner";

import { CustomTextField } from "../AccountWidget";
import CloseBtn from "./CloseBtn";
import WidgetBtn from "./WidgetBtn";
interface RegFormProps{
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
    updatePhoneInput: (event: any) => void,
    updatePassword_1Input: (event: any) => void,
    handleLoginSubmit: () => Promise<void>,
    handleForgotPasswordState: () => void,
    handleSwitchToReg: () => void,
    updateFirstNameInput: (event: any) => void,
    updateLastNameInput: (event: any) => void,
    updatePassword_2Input: (event: any) => void
    handleRegistration: () => Promise<void>
    handleSwitchToLogin: () => void
}

const RegForm = (props: RegFormProps)=>{

    let { 
        loadingBarsStyle, 
        textFieldSXProps, 
        isLoading, 
        validationError, 
        updateEmailInput,
        updatePhoneInput, 
        updateFirstNameInput, 
        updateLastNameInput, 
        updatePassword_1Input, 
        updatePassword_2Input, 
        handleRegistration, 
        handleSwitchToLogin,
        handleCloseBtn 
    } = props

    return(
        <div id="login-container">
                <CloseBtn handleCloseBtn={handleCloseBtn}/>
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
                    <CustomTextField
                        error={validationError.state}
                        id="email-input"
                        className="form-fields"
                        label="Email address"
                        onChange={(e)=>{updateEmailInput(e)}}
                        sx={textFieldSXProps}
                        required
                    />
                    <CustomTextField
                        error={validationError.state}
                        id="phone-input"
                        className="form-fields"
                        label="Phone number"
                        onChange={(e)=>{updatePhoneInput(e)}}
                        sx={textFieldSXProps}
                        required
                    />
                    <CustomTextField
                        error={validationError.state}
                        id="first-name-input"
                        className="form-fields"
                        label="First name"
                        onChange={(e)=>{updateFirstNameInput(e)}}
                        sx={textFieldSXProps}
                        required
                    />
                    <CustomTextField
                        error={validationError.state}
                        id="email-input"
                        className="form-fields"
                        label="Last name"
                        onChange={(e)=>{updateLastNameInput(e)}}
                        sx={textFieldSXProps}
                        required
                    />
                    <CustomTextField
                        error={validationError.state}
                        className="password-input form-fields"
                        type="password"
                        label={"Password"}
                        onChange={(e)=>{updatePassword_1Input(e)}}
                        sx={textFieldSXProps}
                        required
                    />
                    <CustomTextField
                        error={validationError.state}
                        className="password-input form-fields"
                        type="password"
                        label={"Confirm password"}
                        onChange={(e)=>{updatePassword_2Input(e)}}
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
                        <WidgetBtn 
                            disabledBool={isLoading}
                            action={handleRegistration}
                        >
                            Register
                        </WidgetBtn>
                        <WidgetBtn
                            disabledBool={isLoading}
                            action={handleSwitchToLogin}
                        >
                            Have an account?
                        </WidgetBtn>
                    </div>
                </div>
            </div>
    )
}

export default RegForm