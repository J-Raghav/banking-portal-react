import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import UserContext from '../../contexts/UserContext'

export default function LockRoute({component: Component, ...otherProps}) {
    const [user] = useContext(UserContext)
    const renderWrapper = (props, render) => {
        if(!user.token){
            return render ? render(props) : <Component {...props}/>
        }
            return <Redirect to={{ pathname: "/Home", state: {postLogin: true}}}/>

        // return  <Redirect to={{ pathname: "/Home", state: {error: 'Already Logged In'}}}/>
    }
    return (
        <Route {...otherProps} render={(props) => renderWrapper(props, otherProps.render)}/>
    )
}
