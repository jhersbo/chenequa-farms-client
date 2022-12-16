import React from "react"
import { render, screen } from "@testing-library/react"
import ResetPassword from "../side_components/ResetPassword"
import userEvent from "@testing-library/user-event"

it("renders password reset form", ()=>{
    render(<ResetPassword/>)
})

it("renders form labels properly", ()=>{
    render(<ResetPassword/>)
    const emailInput = screen.getByLabelText("Email address")
    const passInput = screen.getByLabelText("Password")
    const confirmPass = screen.getByLabelText("Confirm password")

    expect(emailInput).toBeInTheDocument()
})

it("submit password reset button renders properly", ()=>{
    render(<ResetPassword/>)
    const submitBtn = screen.getByLabelText("submit password update")
    expect(submitBtn).toBeInTheDocument()

    userEvent.click(submitBtn)

    expect(submitBtn).toBeDisabled()
})