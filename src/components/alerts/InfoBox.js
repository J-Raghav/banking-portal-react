import React from 'react'

export default function InfoBox(props) {
    return (
        <div className={`alert alert-info text-center mt-4 mb-n4 rounded-0 shadow-sm ${props.className}`}>
           {props.children} 
        </div>
    )
}
