import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';
import {  Button, Form, Input } from 'antd';


function LoginPage(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const BackButtonHandler =() => {
    navigate('/')
  }
  const LoginSubmitHandler = async (event) => {

    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/')
        } else {
          alert('로그인실패')
        }
      })

  }


  return (

    
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: "100vh"
    }}>
      <Form style={{
        display: 'flex', flexDirection: 'column'
      }} >
        <label >Email</label>
        <Input type='email' value={Email} onChange={onEmailHandler} title="이메일 주소를 입력하세요">
        </Input>
        <label>Password</label>
        <Input type='text' value={Password} onChange={onPasswordHandler} title="비밀번호를 입력하세요">
        </Input>
        <br />
        <Button type="button"  onClick={LoginSubmitHandler} style={{ backgroundColor: '#8BC34A' }}>
          Login
        </Button>
        <br />
        <Button type="button" onClick={BackButtonHandler} style={{ backgroundColor: '#d6d6d6' }}>
          Back
        </Button>
      </Form>
    </div>
  )
}

export default LoginPage
