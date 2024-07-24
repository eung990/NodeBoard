import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';
import Auth from "../../../hoc/hoc"


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

  const LoginSubmitHandler = async (event) => {

    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }
    // var LoginSuccess= await dispatch(loginUser(body))
    // if (LoginSuccess){
    //   props.history.push("/");
    // }else{
    //   alert("로그인 실패")
    // }

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
      <form style={{
        display: 'flex', flexDirection: 'column'
      }} onSubmit={LoginSubmitHandler}>
        <label >Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} title="이메일 주소를 입력하세요">
        </input>
        <label>Password</label>
        <input type='text' value={Password} onChange={onPasswordHandler} title="비밀번호를 입력하세요">
        </input>
        <br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
