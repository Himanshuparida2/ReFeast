import React from 'react'
import { AWSlogin } from './AWSlogin';
import GoogleLog from './GoogleLog';

function LoginPage() {
  return (
    <div className='login'>
        <AWSlogin/>
        <GoogleLog/>
    </div>
  )
}

export default LoginPage
