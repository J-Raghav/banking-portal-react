import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import SuccessBox from './alerts/SuccessBox';

export function Home(props) {
  const [{ data }] = useContext(UserContext)
  console.log(data)
  const [postLogin, setPostLogin] = useState(props.location?.state?.postLogin || false)
  setTimeout(() => setPostLogin(false), 3000)

  const TopKeys = ['username', 'accNumber', 'customerId', 'name', 'email']
  return (
    <div className="container">
      {/* {JSON.stringify(props)} */}
      {postLogin ? <SuccessBox>{'Logged in successfully'}</SuccessBox> : ''}
      <div className="border  bg-white shadow-md p-3 mx-auto mt-5" >
        <h1><div className="d-inline-block p-2"><span className="font-weight-light h2">Hello</span> <span className="font-italic font-weight-light h1 text-capitalize">{data.username}</span></div></h1>
        <div className="border bg-light shadow-md mx-auto mt-3 px-3 py-1 d-flex align-items-center">
          <div className="h4 d-inline-block p-2 mb-0 font-weight-light">Quick Actions</div>
          <Link to="/ApplyLoan" className="btn btn-primary mx-2 ">Apply Loan</Link>
          <Link to="/Update" className="btn btn-secondary mx-2">Update Detail</Link>
        </div>
      </div>
      <div className="border  bg-white shadow-md p-3 mx-auto mt-3">
        <div className="row">
          {
            TopKeys.concat(
              Object.keys(data).filter(key => !TopKeys.find(itm => itm === key))
            )
            .filter(key => data[key])
            .map((key, i) =>
            <div key={i} className="col-6 col-md-4 col-lg-3">
              <div className="px-2 py-1 my-1 border text-center bg-light">
                <h6 className="text-capitalize mb-0">{key.replace(/([A-Z])/g, ' $1')}</h6> 
                <div>{data[key]}</div>
              </div>
            </div>
          ).slice(0, 12)}
        </div>
      </div>

    </div>
  )
}
