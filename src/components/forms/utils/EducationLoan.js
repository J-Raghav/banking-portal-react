import React from 'react'
import FormSection from './FormSection'

export default function EducationLoan(props) {
    const { register, errors } = props
    return (
        <FormSection heading="Education Loan Details" className="my-4"> 
            <div className="form-row">
                <div className="form-group col-6 col-sm-3">
                    <label htmlFor="courseFee">Course Fee</label>
                    <input type="number" className={errors?.courseFee ? 'form-control is-invalid' : 'form-control'} id="courseFee" {...register('courseFee', { required: 'Course Fee is required' })} placeholder="Course Fee" />
                    <small className="invalid-feedback">{errors.courseFee?.message}</small>
                </div>
                <div className="form-group col-6 col-sm-3">
                    <label htmlFor="course">Course</label>
                    <input type="text" className={errors?.course ? 'form-control is-invalid' : 'form-control'} id="course" {...register('course', { required: 'Course is required' })} placeholder="Course" />
                    <small className="invalid-feedback">{errors.course?.message}</small>
                </div>
                <div className="form-group col-6 col-sm-3">
                    <label htmlFor="annualIncome">Annual Income</label>
                    <input type="number" className={errors?.annualIncome ? 'form-control is-invalid' : 'form-control'} id="annualIncome" {...register('annualIncome', { required: 'Annual Income is required' })} placeholder="Annual Income" />
                    <small className="invalid-feedback">{errors.annualIncome?.message}</small>
                </div>
                <div className="form-group col-6 col-sm-3">
                    <label htmlFor="rationCardNo">Ration Card No</label>
                    <input type="text" className={errors?.rationCardNo ? 'form-control is-invalid' : 'form-control'} id="rationCardNo" {...register('rationCardNo', { required: 'Ration Card No is required' })} placeholder="Ration Card No." />
                    <small className="invalid-feedback">{errors.rationCardNo?.message}</small>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-6 col-sm-4">
                    <label htmlFor="fatherOcc">Father's Occupation</label>
                    <input type="text" className={errors?.fatherOcc ? 'form-control is-invalid' : 'form-control'} id="fatherOcc" {...register('fatherOcc', { required: 'Occupation is required' })} placeholder="Father's Occupation" />
                    <small className="invalid-feedback">{errors.fatherOcc?.message}</small>
                </div>
                <div className="form-group col-6 col-sm-4">
                    <label htmlFor="fatherExp">Father's Experience</label>
                    <input type="number" className={errors?.fatherExp ? 'form-control is-invalid' : 'form-control'} id="fatherExp" {...register('fatherExp', { required: 'Experience is required' })} placeholder="Father's Experience" />
                    <small className="invalid-feedback">{errors.fatherExp?.message}</small>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="fatherExpCur">Father's Current Experience</label>
                    <input type="number" className={errors?.fatherExpCur ? 'form-control is-invalid' : 'form-control'} id="fatherExpCur" {...register('fatherExpCur', { required: 'Experience is required' })} placeholder="Current company Father's Experience" />
                    <small className="invalid-feedback">{errors.fatherExpCur?.message}</small>
                </div>
            </div>
        </FormSection>
    )
}
