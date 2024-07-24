import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpUser } from '../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Form, message, Input, Icon } from 'antd';


function SignUpPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const BackButtonHandler = (event) => {
    navigate("/")
  }
  const SignUpSubmitHandler = async (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("비밀번호와 비밀번호 확인이 같지 않습니다")
    }

    const body = {
      email: Email,
      userName: Name,
      password: Password,
    }


    var SignUpSuccess = await dispatch(SignUpUser(body))
    if (!SignUpSuccess.payload.success) {
      alert("회원가입 실패")
      console.log('=====SignUpSuccess.payload.success======= ' + SignUpSuccess.payload.success + ' ============')
    } else {
      navigate("/LoginPage");
      console.log("회원가입을 축하드립니다")
    }

  }


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: "100vh"
    }}>
      <Form style={{
        display: 'flex', flexDirection: 'column'
      }}>
        <label >Name</label>
        <Input type='text' value={Name} onChange={onNameHandler} title="이름을 입력하세요">
        </Input>
        <label >Email</label>
        <Input type='email' value={Email} onChange={onEmailHandler} title="이메일 주소를 입력하세요">
        </Input>
        <label>Password</label>
        <Input type='text' value={Password} onChange={onPasswordHandler} title="비밀번호를 입력하세요">
        </Input>
        <label>ConfirmPassword</label>
        <Input type='text' value={ConfirmPassword} onChange={onConfirmPasswordHandler} title="비밀번호 확인">
        </Input>
        <br />
        <Button type="button" onClick={SignUpSubmitHandler} style={{ backgroundColor: '#8BC34A' }}>
          Sign UP
        </Button>
        <br />
        <Button type="button" onClick={BackButtonHandler} style={{ backgroundColor: '#d6d6d6' }}>
          Back
        </Button>
      </Form>
    </div>
  )
}

export default SignUpPage
