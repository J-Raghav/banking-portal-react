import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import SuccessBox from './alerts/SuccessBox';

export function Home(props) {
  const [{ data }] = useContext(UserContext)
  return (
    <div className="container">
      {/* {JSON.stringify(props)} */}
      { props.location?.state?.postLogin ? <SuccessBox>{'Logged in successfully'}</SuccessBox> : ''}
      <div className="border  bg-white shadow-md p-3 mx-auto mt-5" >
        <h1><div className="d-inline-block p-2"><span className="font-weight-light h2">Hello</span> <span className="font-italic font-weight-light h1">{data.name}</span></div></h1>
        <div className="border bg-light shadow-md mx-auto mt-3 px-3 py-1 d-flex align-items-center">
          <div className="h4 d-inline-block p-2 mb-0 font-weight-light">Quick Actions</div>
          <Link to="/ApplyLoan" className="btn btn-primary mx-2 ">Apply Loan</Link>
          <Link to="/Update" className="btn btn-secondary mx-2">Update Detail</Link>
        </div>
      </div>

    </div>
  )
}
