import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { postLoginForm } from '../../services/HttpService';
import ErrorBox from '../alerts/ErrorBox';
import FormSection from './utils/FormSection';



export default function Login(props) {
    const [user, setUserData] = useContext(UserContext)
    const [formState, setFormState] = useState({
        success: false,
        isLoading: false,
        error: '',
        data: null
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: 'onChange'})
    
    const onSuccess = data => {
        // setFormState({success: true, isLoading: false, error: ''})
        setUserData({ ...data, postLogin: true })

    }
    const onError = e => {
        // setFormSuccess(false)
        setFormState({success: false, isLoading: false, error: e.message})
        // setError(e.message)
    }

    const onSubmit = userData => {
        setFormState({ success: false, error: '', isLoading: true})
        postLoginForm(userData)
            .then(onSuccess)
            .catch(onError)
        reset({ password: '' })
    };
    const linkRegister = <p className="small"><Link to="/register">New User? Register here</Link></p>
    const customStyle = { maxWidth: 350 + 'px' };


    return (
        <div className="m-auto" style={customStyle}>
            {formState.error && <ErrorBox>{formState.error}</ErrorBox>}
            {/* {!error && props.location.state?.postRegister ? <SuccessBox><div>Registered successfully !</div><div>Please Login to continue</div></SuccessBox> : ''} */}
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
                    <button type="submit" className="btn btn-primary" disabled={formState.isLoading}>{formState.isLoading ? 'Loading...' : 'Login'}</button>
                </form>
            </FormSection>
        </div>
    )
}
