import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from "../../../hoc/hoc"

function StartPage(){
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/api/hello')
        .then(res => console.log(res.data));
    
    },[])
    const onLogoutHandler = async () =>{
        const res = await axios.get("/api/users/logout")

        if(res){
            navigate("/LoginPage");
            console.log("로그아웃 완료")
        }else{
            console.log("로그아웃 실패")
        }
    }

    const onLoginHandler = () => {
        navigate("/LoginPage");
    }

    const onSignUpHandler = () => {
        navigate("/SignUpPage");
    }
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width:'100%',height:"100vh"
        }}>
            <h2>StartPage</h2>

            <button onClick={onLogoutHandler}>
                Logout
            </button>

            <button onClick={onLoginHandler}>
                Login
            </button>

            <button onClick={onSignUpHandler}>
                SignUp
            </button>
        </div>
    )
}

export default StartPage
