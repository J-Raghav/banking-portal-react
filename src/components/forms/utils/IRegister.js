import { Country, State } from 'country-state-city'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ErrorBox from '../../alerts/ErrorBox'
import SuccessBox from '../../alerts/SuccessBox'
import FormSection from './FormSection'

function validateDate(value) {
    let dob = new Date(value)
    let timeGap = Date.now() - dob.getTime()
    let gapDate = new Date(timeGap)
    let age = gapDate.getUTCFullYear() - 1970
    return (18 <= age && age <= 96) || 'Age should be between 18 and 96'
}

function scrollTop(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

const initFormState = {
    success: false,
    isLoading: false,
    error: '',
}


export default function IRegister({ formType, userData, onSubmit, linkEmbed }) {
    
    const [countryStates, setStates] = useState({ 
        disabled: !userData, 
        states: userData?.country ? State.getStatesOfCountry(userData.country) : []
    })
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: userData, mode: 'onChange'});
    const [formState, setFormState] = useState(initFormState)
    const onSuccess = data => {
        formType?.loadSuccessMessage(data)
        setFormState({isLoading: false, success: true, error: ''})
        if(!formType.redirect)
            scrollTop()
    }
    const onError = e => {
        setFormState({error: e.message, success: false, isLoading: false})
        scrollTop()
    }

    const updateStates = e => {
        setStates({ disabled: false, states: State.getStatesOfCountry(e.target.value) })
    }

    const countryRegister = register('country', { required: 'Country is required', validate: value => value !== 'choose' || 'Country is required' })
    
    // if(formState.success && formType.redirect){
    //     return formType.redirect
    // }
    if(formState.success)
        formType.loadSuccessMessage()

    return (
        <div>
            <h1 className="h1 text-center">{formType.name}</h1>
            <form onSubmit={handleSubmit((data) => {
                setFormState(prev => {return {...prev, isLoading: true}})
                onSubmit(data, onSuccess, onError)
            })}>
                { formState.error && <ErrorBox>{formState.error}</ErrorBox> }
                { formState.success ? <SuccessBox>{formType.successMessage}</SuccessBox> : ''}

                <FormSection heading="User Details" className="my-4" linkEmbed={linkEmbed}>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="name">Name</label>
                            <input type="name" className={errors?.name ? 'form-control is-invalid' : 'form-control'} id="name" {...register('name', { required: 'Name is required', pattern: { value: /^[A-Za-z\s]+$/, message: 'Name should only contain alphabet and white spaces' } })} placeholder="Name" />
                            <small className="invalid-feedback">{errors.name?.message}</small>
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date" className={errors?.dateOfBirth ? 'form-control is-invalid' : 'form-control'} id="dateOfBirth" {...register('dateOfBirth', { required: 'Date of birth is required', validate: validateDate })} placeholder="Date of Birth" />
                            <small className="invalid-feedback">{errors.dateOfBirth?.message}</small>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="email">Email</label>
                            <input type="text" className={errors?.email ? 'form-control is-invalid' : 'form-control'} id="email" {...register('email', { required: 'Email is required', pattern: { value: /[^@]+@[^@]+\.[^@]+/, message: 'Invaild Email' }})} placeholder="email" />
                            <small className="invalid-feedback">{errors?.email?.message}</small>

                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input type="text" className={errors?.contactNumber ? 'form-control is-invalid' : 'form-control'} id="contactNumber" {...register('contactNumber', { required: 'Contact Numebr is required', pattern: { value: /^\d{10}$/, message: 'Contact number should be of 10 digits' } })} placeholder="Contact Number" />
                            <small className="invalid-feedback">{errors?.contactNumber?.message}</small>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" defaultValue="choose" {...register('gender', { required: 'Gender is Required', validate: value => value !== 'choose' || 'Gender is required' })} className={errors?.gender ? 'form-control is-invalid' : 'form-control'}>
                                <option value="choose" disabled>Choose...</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                            <small className="invalid-feedback">{errors.gender?.message}</small>
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="martialStatus">Martial Status</label>
                            <select id="martialStatus" defaultValue="choose" {...register('martialStatus', { required: 'Martial Status is required', validate: value => value !== 'choose' || 'Martial Status is required' })} className={errors?.martialStatus ? 'form-control is-invalid' : 'form-control'}>
                                <option value="choose" disabled>Choose...</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                            </select>
                            <small className="invalid-feedback">{errors.martialStatus?.message}</small>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="identityDocName">Identity Document Type</label>
                            <input type="text" className={errors?.identityDocName ? 'form-control is-invalid' : 'form-control'} id="identityDocName"  {...register('identityDocName', { required: 'Identity document type is required' })} placeholder="Document Type" />
                            <small className="invalid-feedback">{errors?.identityDocName?.message}</small>
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="identityDocNumber">Identity Document Number</label>
                            <input type="text" className={errors?.identityDocNumber ? 'form-control is-invalid' : 'form-control'} id="identityDocNumber"  {...register('identityDocNumber', { required: 'Identity document number is required', pattern: { value: /[\w\d]{12}/, message: "Invalid PAN number" } })} placeholder="Document number" />
                            <small className="invalid-feedback">{errors?.identityDocNumber?.message}</small>
                        </div>
                    </div>
                </FormSection>
                <div className="my-4">
                    <div className="row align-items-stretch">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <FormSection heading="Address" className="h-100">
                                <div className="form-row">
                                    <div className="form-group col-sm-12">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" className={errors?.address ? 'form-control is-invalid' : 'form-control'} id="address"  {...register('address', { required: 'Address is required' })} placeholder="Address" />
                                        <small className="invalid-feedback">{errors?.address?.message}</small>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="country">Country</label>
                                        <select defaultValue="choose" className={errors?.country ? 'form-control is-invalid' : 'form-control'} id="country" {...countryRegister} onChange={(e) => { countryRegister.onChange(e); updateStates(e) }}>
                                            <option value="choose" disabled>Choose...</option>
                                            {Country.getAllCountries().map(item => <option key={item.isoCode} value={item.isoCode} >{item.name}</option>)}
                                        </select>
                                        <small className="invalid-feedback">{errors?.country?.message}</small>

                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="state">State</label>
                                        <select defaultValue="choose" className={errors?.state ? 'form-control is-invalid' : 'form-control'} id="state" {...register('state', { required: 'State is required', validate: value => value !== 'choose' || 'State is required' })} disabled={countryStates.disabled}>
                                            <option value="choose" disabled>{countryStates.disabled ? 'Choose country first' : 'Choose state...'}</option>
                                            {countryStates.states.map(item => <option key={item.isoCode} value={item.isoCode} >{item.name}</option>)}
                                        </select>
                                        <small className="invalid-feedback">{errors?.state?.message}</small>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="citizenship">Citizenship</label>
                                    <input type="text" className={errors?.citizenship ? 'form-control is-invalid' : 'form-control'} id="citizenship" {...register('citizenship', { required: 'Citizenship is required' })} placeholder="Citizenship" />
                                    <small className="invalid-feedback">{errors?.citizenship?.message}</small>
                                </div>
                            </FormSection>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <FormSection heading="Reference Details">
                                <div className="form-group">
                                    <label htmlFor="refName">Reference Name</label>
                                    <input type="text" className={errors?.refName ? 'form-control is-invalid' : 'form-control'} id="refName" {...register('refName', { required: 'Reference name is required', pattern: { value: /^[A-Za-z\s]+$/, message: 'Name should only contain alphabet and white spaces' } })} placeholder="Reference Name" />
                                    <small className="invalid-feedback">{errors?.refName?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="refAccNumber">Reference Account Number</label>
                                    <input type="text" className={errors?.refAccNumber ? 'form-control is-invalid' : 'form-control'} id="refAccNumber" {...register('refAccNumber', { required: 'Reference account number is required' })} placeholder="Reference Account Number" />
                                    <small className="invalid-feedback">{errors?.refAccNumber?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="refAddress">Reference Address</label>
                                    <input type="text" className={errors?.refAddress ? 'form-control is-invalid' : 'form-control'} id="refAddress" {...register('refAddress', { required: 'Reference address is required ' })} placeholder="Reference Address" />
                                    <small className="invalid-feedback">{errors?.refAddress?.message}</small>
                                </div>
                            </FormSection>
                        </div>
                        <div className="col-md-6 col-lg-4" >
                            <FormSection heading="Guardian Details" className="h-100">
                                <div className="form-group">
                                    <label htmlFor="guardianType">Guardian Type</label>
                                    <input type="text" className={errors?.guardianType ? 'form-control is-invalid' : 'form-control'} id="guardianType" {...register('guardianType', { required: 'Guardian type is required' })} placeholder="Guardian Type" />
                                    <small className="invalid-feedback">{errors?.guardianType?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="guardianName">Guardian Name</label>
                                    <input type="text" className={errors?.guardianName ? 'form-control is-invalid' : 'form-control'} id="guardianName" {...register('guardianName', { required: 'Guardian name is required' })} placeholder="Guardian Name" />
                                    <small className="invalid-feedback">{errors?.guardianName?.message}</small>
                                </div>
                            </FormSection>
                        </div>
                    </div>
                </div>
                <FormSection heading="Account Details" className="my-4">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="accountType">Account Type</label>
                                <select id="accountType" defaultValue="choose" className={errors?.accountType ? 'form-control is-invalid' : 'form-control'} {...register('accountType', { required: 'Account type is required', validate: value => value !== 'choose' || 'Account Type is required' })} >
                                    <option value="choose" disabled>Choose...</option>
                                    <option value="saving">Saving</option>
                                    <option value="salary">Salary</option>
                                </select>
                                <small className="invalid-feedback">{errors?.accountType?.message}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="branchName">Branch Name</label>
                                <input type="text" className={errors?.branchName ? 'form-control is-invalid' : 'form-control'} id="branchName" {...register('branchName', { required: 'Branch name is required' })} placeholder="Branch Name" />
                                <small className="invalid-feedback">{errors?.branchName?.message}</small>
                            </div>
                        </div>
                        <div className="col-sm-6">
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
                        </div>
                    </div>
                </FormSection>
                <button type="submit" className="btn btn-primary" disabled={formState.isLoading}>{formState.isLoading ? 'Loading...' : 'Submit'}</button>
            </form>
        </div>

    )
}
