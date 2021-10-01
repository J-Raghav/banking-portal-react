import React from 'react'
import FormSection from './FormSection'

export default function PersonalLoan(props) {
    const { register, errors } = props

    return (
        <FormSection heading="Personal Loan Detail" className="my-4">
            <div className="form-row">
                <div className="form-group col-6 col-sm-4">
                    <label htmlFor="company">Company</label>
                    <input type="text" className={errors?.company ? 'form-control is-invalid' : 'form-control'} id="company" {...register('company', { required: 'Company Name is required' })} placeholder="Company Name" />
                    <small className="invalid-feedback">{errors.company?.message}</small>
                </div>
                <div className="form-group col-6 col-sm-4">
                    <label htmlFor="designation">Designation</label>
                    <input type="text" className={errors?.designation ? 'form-control is-invalid' : 'form-control'} id="designation" {...register('designation', { required: 'Designation is required' })} placeholder="Designation" />
                    <small className="invalid-feedback">{errors.designation?.message}</small>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="annualIncome">Annual Income</label>
                    <input type="number" className={errors?.annualIncome ? 'form-control is-invalid' : 'form-control'} id="annualIncome" {...register('annualIncome', { required: 'Annual Income is required' })} placeholder="Annual Income" />
                    <small className="invalid-feedback">{errors.annualIncome?.message}</small>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-6">
                    <label htmlFor="exp">Total Experience</label>
                    <input type="number" className={errors?.exp ? 'form-control is-invalid' : 'form-control'} id="fatherExp" {...register('exp', { required: 'Experience is required' })} placeholder="Total Experience" />
                    <small className="invalid-feedback">{errors.exp?.message}</small>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="expCur">Current Experience</label>
                    <input type="number" className={errors?.expCur ? 'form-control is-invalid' : 'form-control'} id="expCur" {...register('expCur', { required: 'Current Experience is required' })} placeholder="Current company Experience" />
                    <small className="invalid-feedback">{errors.expCur?.message}</small>
                </div>
            </div>
        </FormSection>
    )
}
