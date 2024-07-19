import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';

function LoginPage() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const LoginSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    console.log("==========password===",Password)
    dispatch(loginUser(body))

  }


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: "100vh"
    }}>
      <form style={{
        display: 'flex', flexDirection: 'column'
      }} onChange={LoginSubmitHandler}>
        <label >Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} title="이메일 주소를 입력하세요">
        </input>
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} title="비밀번호를 입력하세요">
        </input>
        <br />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
