import React from 'react'
import './Button.css'

export default function Button({ text, onClick, type }) {
    return (
        // <div>
        //     <button className='button' onClick={onClick} type='submit'>{text || "Opération"}</button>
        // </div>

        <div>
            <button className='button' type={type} >{text || "Opération"}</button>
        </div>
    )
}
