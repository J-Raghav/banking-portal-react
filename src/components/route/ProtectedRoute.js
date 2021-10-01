import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import UserContext from '../../contexts/UserContext'

export default function ProtectedRoute({component: Component, ...otherProps}) {
    const [user] = useContext(UserContext)
    const renderWrapper = (props, render) => {
        if(user.token){
            return render ? render(props) : <Component {...props}/>
        }
        return  <Redirect to={{ pathname: "/Login", state: {error: 'Please Login to continue'}}}/>
    }
    return (
        <Route {...otherProps} render={(props) => renderWrapper(props, otherProps.render)}/>
    )
}
