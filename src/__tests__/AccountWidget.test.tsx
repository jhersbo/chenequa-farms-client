import AccountWidget from "../main_site_components/main_container_components/minor_components/AccountWidget";
import { screen, render } from "@testing-library/react";
import { UserContext } from "../contexts/global";

let mockUser = {
    user_id: 0,
    email_address: "johndoe@gmail.com",
    phone_number: "1234567890",
    first_name: "john",
    last_name: "doe",
    is_admin: false,
    reset_password_token: null,
    reset_password_expiration: null
}

it("renders default greeting when no user is signed in", ()=>{
    let cxtObj = {
        value: null,
        setUser: jest.fn()
    }
    render(
        <UserContext.Provider value={cxtObj}>
            <AccountWidget/>
        </UserContext.Provider>
    )
    expect(screen.getByText(/^Welcome,/)).toHaveTextContent("Welcome, guest.")
})

it("renders proper greeting when a user is signed in", ()=>{
    
    let cxtObj = {
        value: mockUser,
        setUser: jest.fn()
    }
    render(
        <UserContext.Provider value={cxtObj}>
            <AccountWidget/>
        </UserContext.Provider>
    )
    expect(screen.getByText(/^Welcome,/)).toHaveTextContent(
        `Welcome, ${mockUser.first_name.charAt(0).toUpperCase() + mockUser.first_name.slice(1)}`
    )
})