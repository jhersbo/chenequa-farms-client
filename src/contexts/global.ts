import { createContext } from "react";

//logged-in user
export interface UserContextInterface{
    user_id: string,
    email_address: string,
    password_hash: string,
    first_name: string,
    last_name: string,
    is_admin: boolean,
    user_orders?: [
        {
            filled: boolean,
            order_content: string[],
            order_id: string,
        }
    ],
    subscriptions?: [
        {
            active: boolean,
            purch_date: string,
            renew_date: string, 
            rate: string | number
        }
    ]
}

export const UserContext = createContext<UserContextInterface | any>(null)


//screen size
export interface ScreenSizeContextInterface{
    height: number, 
    width: number
}

export const ScreenSizeContext = createContext<ScreenSizeContextInterface | null>(null)