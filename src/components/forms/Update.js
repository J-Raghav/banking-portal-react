import React, { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { postUpdateForm } from '../../services/HttpService'
import IRegister from './utils/IRegister'

export default function Update() {
    const [user, setUserData] = useContext(UserContext)
    const formType = {
        name: 'Update',
        // redirect: false,
        loadSuccessMessage: function(data){
            this.successMessage = 'Details Updated Successfully'
        }
    }
    

    const onSubmit = (data, onSuccess, onError) => {
        postUpdateForm(data, {token: user.token})
        .then((data) => {
            onSuccess(data)
            setUserData({...user, data})
        })
        .catch(onError)
    }

    const formData = {...user.data, dateOfBirth: user.data.dateOfBirth.split('T')[0]}
    return (
        <div>
            <IRegister heading="Update Details" userData={formData} onSubmit={onSubmit} formType={formType}/>
        </div>
    )
}
