import React from "react"
import { render, screen } from "@testing-library/react"
import App from "../App"

it("renders without crashing", ()=>{
    render(<App/>)
})

it("renders brand hero", ()=>{
    render(<App/>)
    expect(screen.getByText("ChenequaFarms.com")).toBeInTheDocument()
})