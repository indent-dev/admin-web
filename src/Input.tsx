import React, { useState } from "react"
import { Input as AntdInput, Button } from "antd"

type Category = {
    name: string
}
type InputProps = {
    placeholder: string
    onSubmit: (value: string) => void
}
const Input = ({ placeholder, onSubmit }: InputProps) => {

    const [value, setValue] = useState<string>("")

    const handleButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onSubmit(value)
        setValue("")
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <div style={{ display: "flex" }}>
            <AntdInput
                placeholder={placeholder}
                size="middle"
                value={value}
                onChange={handleInputChange} />
            <Button type="primary" onClick={handleButtonClick} >Add Category</Button>
        </div>
    )
}

export default Input