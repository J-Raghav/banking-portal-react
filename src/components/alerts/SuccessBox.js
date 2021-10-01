import React from 'react'

export default function SuccessBox(props) {
    return (
        <div className={`alert alert-success text-center mt-4 mb-n4 rounded-0 shadow-sm ${props.className}`}>
           {props.children} 
        </div>
    )
}
