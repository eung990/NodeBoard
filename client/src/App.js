import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Auth from "./hoc/hoc"

import StartPage from "./components/views/StartPage/StartPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage"

function App() {
  const newStartPage = Auth(StartPage, null);
  const newLoginPage = Auth(LoginPage, false);
  const newSignUpPage = Auth(SignUpPage, false);
  const newUploadProductPage = Auth(UploadProductPage, true);
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={newStartPage} />
          <Route path="/LoginPage" element={newLoginPage} />
          <Route path="/SignUpPage" element={newSignUpPage} />
          <Route path="/ProductPage/upload" element={newUploadProductPage} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
