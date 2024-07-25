import React, { useEffect } from "react";
import { userAuth } from "../_actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Auth = (SpecificComponent, option, adminRoute = null) => {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector(state => state.user);

    useEffect(() => {
      dispatch(userAuth())
        .then((res) => {
          console.log("======res.payload.data.isAuth====", res.payload.data.isAuth);

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
      <SpecificComponent  {...props} user={user} />
    );
  }

  return <AuthenticationCheck />;
};

export default Auth;
