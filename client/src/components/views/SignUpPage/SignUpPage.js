import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpUser } from '../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';
import Auth from "../../../hoc/hoc"

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
      <form style={{
        display: 'flex', flexDirection: 'column'
      }} onSubmit={SignUpSubmitHandler}>
        <label >Name</label>
        <input type='text' value={Name} onChange={onNameHandler} title="이름을 입력하세요">
        </input>
        <label >Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} title="이메일 주소를 입력하세요">
        </input>
        <label>Password</label>
        <input type='text' value={Password} onChange={onPasswordHandler} title="비밀번호를 입력하세요">
        </input>
        <label>ConfirmPassword</label>
        <input type='text' value={ConfirmPassword} onChange={onConfirmPasswordHandler} title="비밀번호 확인">
        </input>
        <br/>
        <button type="submit">
          Sign UP
        </button>
      </form>
    </div>
  )
}

export default SignUpPage
