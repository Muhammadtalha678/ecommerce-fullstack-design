import React from 'react'

const Button = ({ bgColor, hoverColor, textColor, buttonText }: { bgColor: string, hoverColor: string, textColor: string, buttonText: string }) => {
    return (
        <button className={`mt-4 px-6 py-2 ${textColor} ${bgColor} rounded-md hover:${hoverColor} transition custom-font-medium text-[16px]`}>
            {buttonText}
        </button>
    )
}

export default Button
