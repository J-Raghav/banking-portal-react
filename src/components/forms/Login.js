import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { postLoginForm } from '../../services/HttpService';
import ErrorBox from '../alerts/ErrorBox';
import InfoBox from '../alerts/InfoBox';
import SuccessBox from '../alerts/SuccessBox';
import FormSection from './utils/FormSection';



export default function Login(props) {
    const [user, setUserData] = useContext(UserContext)
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: 'onChange'})
    
    const clearError = () => { setError('') }

    const onSuccess = data => {
        setUserData({ data, token: 'x', postLogin: true })
    }
    const onError = e => {
        // setFormSuccess(false)
        setError(e.message)
    }

    const onSubmit = userData => {
        clearError()
        postLoginForm(userData)
            .then(onSuccess)
            .catch(onError)
        reset({ password: '' })
    };
    const linkRegister = <p className="small"><Link to="/register">New User? Register here</Link></p>
    const customStyle = { maxWidth: 350 + 'px' };


    return (
        <div className="m-auto" style={customStyle}>
            {error && <ErrorBox>{error}</ErrorBox>}
            {!error && props.location.state?.postRegister ? <SuccessBox><div>Registered successfully !</div><div>Please Login to continue</div></SuccessBox> : ''}
            <FormSection heading="Login" className="my-4" linkEmbed={linkRegister}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className={errors?.username ? 'form-control is-invalid' : 'form-control'} id="username" {...register('username', { required: 'Username is required' })} placeholder="Username" />
                        <small className="invalid-feedback">{errors?.username?.message}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className={errors?.password ? 'form-control is-invalid' : 'form-control'} id="password" {...register('password', { required: 'Passsword is required' })} placeholder="Password" />
                        <small className="invalid-feedback">{errors?.password?.message}</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </FormSection>
            <InfoBox>
                <div>Username: admin</div>
                <div>Password:   123</div>
            </InfoBox>
        </div>
    )
}
