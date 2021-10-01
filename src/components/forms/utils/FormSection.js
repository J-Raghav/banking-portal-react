import React from 'react'

export default function FormSection(props) {
    return (
        <div className={`mx-auto p-3 pt-sm-4 px-sm-4 pt-md-5 border  shadow-sm bg-white ${props.className}`} style={props.customStyle}>
            <h2 className="h2 mb-0">{props.heading}</h2>
            <hr className="my-2" />
            {props?.linkEmbed}
            <div className="my-4">
                {props.children}
            </div>
        </div>
    )
}
