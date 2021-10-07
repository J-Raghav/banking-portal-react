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
                    <input type="number" className={errors?.annualIncome ? 'form-control is-invalid' : 'form-control'} id="annualIncome" {...register('annualIncome', {  valueAsNumber: true, required: 'Annual Income is required' })} placeholder="Annual Income" />
                    <small className="invalid-feedback">{errors.annualIncome?.message}</small>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-6">
                    <label htmlFor="totalExp">Total Experience</label>
                    <input type="number" className={errors?.totalExp ? 'form-control is-invalid' : 'form-control'} id="fatherTotalExp" {...register('totalExp', {  valueAsNumber: true, required: 'Experience is required' })} placeholder="Total Experience" />
                    <small className="invalid-feedback">{errors.totalExp?.message}</small>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="currentCompanyExp">Current Company Experience</label>
                    <input type="number" className={errors?.currentCompanyExp ? 'form-control is-invalid' : 'form-control'} id="currentCompanyExp" {...register('currentCompanyExp', {  valueAsNumber: true, required: 'Current Experience is required' })} placeholder="Current company Experience" />
                    <small className="invalid-feedback">{errors.currentCompanyExp?.message}</small>
                </div>
            </div>
        </FormSection>
    )
}
