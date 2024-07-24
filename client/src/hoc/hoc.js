import React, { useEffect } from "react";
import { userAuth } from "../_actions/user_actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Auth = (SpecificComponent, option, adminRoute = null) => {
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(userAuth())
        .then((res) => {
          console.log("======res.payload.data.isAuth====" , res.payload.data.isAuth);

          //로그인 하지 않은 상태
          if (!res.payload.data.isAuth) {
            if (option) {
              navigate("/LoginPage");
            }
          }
          //로그인 한 상태 
          else {
            if (adminRoute && !res.payload.data.isAdmin) {
              navigate("/");
            } else {
              if (option === false) {
                navigate("/");
              }
            }
          }
        });
    }, [dispatch, navigate]);

    return (
      <SpecificComponent />
    );
  }

  return <AuthenticationCheck />;
};

export default Auth;
