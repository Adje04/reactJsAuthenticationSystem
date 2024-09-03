import React from 'react'
import './Input.css'

export default function Input({
    type,
    value,
    onChange,
    placeHolder,
    label,
    reference
}) {
    return (
        <div>
            <label htmlFor={reference}> {label} </label>
            <input
                type={type}
                id={reference}
                value={value}
                onChange={onChange}
                placeholder={placeHolder} />
        </div>
    )
}
