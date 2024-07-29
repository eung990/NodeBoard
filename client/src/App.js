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
import DetailProductPage from "./components/views/DetailProductPage/DetailProductPage"
import EditProductPage from "./components/views/EditProductPage/EditProductPage"

function App() {
  const newStartPage = Auth(StartPage, null);
  const newLoginPage = Auth(LoginPage, false);
  const newSignUpPage = Auth(SignUpPage, false);
  const newUploadProductPage = Auth(UploadProductPage, true);
  const newDetailProductPage = Auth(DetailProductPage, null);
  const newEditProductPage = Auth(EditProductPage, true);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={newStartPage} />
          <Route path="/login" element={newLoginPage} />
          <Route path="/signUp" element={newSignUpPage} />
          <Route path="/product/upload" element={newUploadProductPage} />
          <Route path="/product/update/:productId" element={newEditProductPage} />
          <Route path="/product/:productId" element={newDetailProductPage} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
