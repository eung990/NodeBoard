import React, { useEffect } from "react";
import { userAuth } from "../_actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Auth = (SpecificComponent, requiredAuth, adminOnly = false) => {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
      dispatch(userAuth()).then((res) => {
        const isAuth = res.payload.data.isAuth;
        const isAdmin = res.payload.data.role === 'admin';

        if (!isAuth && requiredAuth) {
          // 인증이 필요한데 로그인하지 않은 경우
          navigate("/login");
        } else if (isAuth && requiredAuth === false) {
          // 로그인한 유저가 비로그인 전용 페이지에 접근한 경우
          navigate("/");
        } else if (adminOnly && !isAdmin) {
          // 관리자 전용 페이지에 일반 유저가 접근한 경우
          navigate("/");
        }
      });
    }, [dispatch, navigate]);

    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
};

export default Auth;