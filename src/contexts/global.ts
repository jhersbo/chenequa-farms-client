import { createContext } from "react";

//logged-in user
export interface UserContextInterface{
    user_id: string,
    email_address: string,
    password_hash: string,
    first_name: string,
    last_name: string,
    is_admin: boolean,
    token?: string,
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

export interface UserCXTObjInterface{
    value: UserContextInterface,
    setUser: (user: UserContextInterface) => void
}

export const UserContext = createContext<UserContextInterface | UserCXTObjInterface | any>(null)


//screen size
export interface ScreenSizeContextInterface{
    height: number, 
    width: number
}

export const ScreenSizeContext = createContext<ScreenSizeContextInterface>({height: window.innerHeight, width: window.innerWidth})

//blur
export interface BlurContextObjInterface{
    value: boolean,
    setBlur: (value: boolean) => void
}
export const BlurContext = createContext<BlurContextObjInterface | null>(null)