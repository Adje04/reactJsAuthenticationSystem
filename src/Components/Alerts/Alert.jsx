import React from 'react'
import '../Alerts/Alert.css'
export default function Alert({ text }) {
    return (
        <div className='alert'>
            {text}
        </div>
    )
}
