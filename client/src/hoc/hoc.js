import React, { useEffect } from "react";
import { userAuth } from "../_actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

// SpecificComponent = 특정 컴포넌트
// option = 로그인 여부 확인
// adminRoute = 관리자 여부 확인
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
              
              navigate("/login");
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
