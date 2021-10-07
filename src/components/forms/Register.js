import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import { postRegisterForm } from '../../services/HttpService'
import ErrorBox from '../alerts/ErrorBox'
import IRegister from './utils/IRegister'




export default function Register(props) {
    const [user] = useContext(UserContext)

    const linkLogin = <p className="small"><Link to="/login">Existing User? Login here</Link></p>
    const formType = {
        name: 'Register',
        // redirect: <Redirect to={{pathname: '/login', state: {postRegister: true }}} />,
        loadSuccessMessage: function(data) { 
            this.successMessage = <div>
                    <h5>Registered Succesfully</h5>
                    <div>{`Customer ID : R-${data.customerId}`}</div>
                    <div>{`Username    : ${data.username}`}</div>
                </div>
        }
    }
    const onSubmit = (data, onSuccess, onError) => {
        postRegisterForm(data)
        .then(onSuccess)
        .catch(onError)

    }
    
    if (user.token)
        return <ErrorBox> Already Logged In! Go to <Link to="/home">Home</Link> page</ErrorBox>

    return (
        <IRegister heading="Register" linkEmbed={linkLogin} onSubmit={onSubmit} formType={formType}/>
    )
}
