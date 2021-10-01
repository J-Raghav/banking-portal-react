import React, { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { postUpdateForm } from '../../services/HttpService'
import IRegister from './utils/IRegister'

export default function Update() {
    const [user] = useContext(UserContext)
    
    const formType = {
        name: 'Update',
        redirect: false,
        successMessage: 'Details Updated Successfully',
    }
    const onSubmit = (data, onSuccess, onError) => {
        postUpdateForm(data)
        .then(onSuccess)
        .catch(onError)
    }
    return (
        <div>
            <IRegister heading="Update Details" userData={user.data} onSubmit={onSubmit} formType={formType}/>
        </div>
    )
}
