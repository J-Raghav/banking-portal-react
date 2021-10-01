import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { postUpdateForm } from '../../services/HttpService';
import ErrorBox from '../alerts/ErrorBox';
import SuccessBox from '../alerts/SuccessBox';
import EducationLoan from './utils/EducationLoan';
import FormSection from './utils/FormSection';
import PersonalLoan from './utils/PersonalLoan';

const initialState = {
    loanType: 'choose',
    loanAmount: '',
    loanDuration: 'choose'
}

export default function ApplyLoan() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onChange', defaultValues: initialState });
    const [error, setError] = useState('')
    const loanType = watch('loanType')
    const [formSuccess, setFormSuccess] = useState(false)

    const onError = e => {
        setFormSuccess(false)
        setError(e.message)
    }
    const onSubmit = (data, onError) => {
        postUpdateForm(data)
        .then(data => {
            setError('')
            setFormSuccess(true)
            console.log(data)
        })
        .catch(onError)
        window.scrollTo({top: 0, behaviour: 'smooth'})
    }
    return (
        <div>
            <h1 className="h1 text-center mb-3 mb-sm-5">Apply Loan</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <ErrorBox>{error}</ErrorBox>}
                { formSuccess ? <SuccessBox>Loan Application submited successfully!</SuccessBox> : ''}
                <div className="my-4">
                    <FormSection heading="Basic Details">
                        <div className="form-row">
                            <div className="form-group col-6 col-sm-4">
                                <label htmlFor="loanType">Loan Type</label>
                                <select id="loanType" {...register('loanType', { required: 'Loan Type is Required', validate: val => val !== 'choose' || 'Loan type is required' })} className={errors?.loanType ? 'form-control is-invalid' : 'form-control'} >
                                    <option value="choose" disabled>Choose...</option>
                                    <option value="education">Education</option>
                                    <option value="personal">Personal/Home</option>
                                </select>
                                <small className="invalid-feedback">{errors?.loanType?.message}</small>
                            </div>
                            <div className="form-group col-6 col-sm-4">
                                <label htmlFor="loanAmount">Loan Amount</label>
                                <input type="number" className={errors?.loanAmount ? 'form-control is-invalid' : 'form-control'} id="loanAmount" {...register('loanAmount', { required: 'Loan Amount is required' })} placeholder="Loan Amount" />
                                <small className="invalid-feedback">{errors.loanAmount?.message}</small>
                            </div>
                            <div className="form-group col-sm-4">
                                <label htmlFor="loanDuration">Loan Duration</label>
                                <select id="loanDuration" className={errors?.loanDuration ? 'form-control is-invalid' : 'form-control'} {...register('loanDuration', { required: 'Loan Duration is required', validate: value => value !== 'choose' || 'Loan Duration is required' })} >
                                    <option value="choose" disabled>Choose...</option>
                                    {[5, 10, 15, 20].map(item => <option key={item} value={item}>{item}</option>)}
                                </select>
                                <small className="invalid-feedback">{errors.loanDuration?.message}</small>
                            </div>
                        </div>
                    </FormSection>
                    <div className="my-4">
                        {loanType !== 'choose' && (loanType === 'personal' ? <PersonalLoan register={register} errors={errors} /> : <EducationLoan register={register} errors={errors} />)}

                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Apply</button>
                <button type="button" className="btn btn-danger ml-3" title="Submit Check Failure" onClick={() => {onSubmit({failFlag: true}, onError)}}>Submit (Fail)</button>
            </form>
        </div>
    )
}
