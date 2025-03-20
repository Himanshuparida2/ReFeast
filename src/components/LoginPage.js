import React from 'react'
import { AWSlogin } from './AWSlogin';
import GoogleLog from './GoogleLog';

function LoginPage() {
  return (
    <div className='login'>
        <div className="login-inner">
          <AWSlogin/>
          <h3>Or</h3>
          <GoogleLog/>
        </div>
    </div>
  )
}

export default LoginPage
