import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Auth from "./hoc/hoc"
import NavBar from "./components/views/NavBar/NavBar";
import StartPage from "./components/views/StartPage/StartPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage"
import DetailProductPage from "./components/views/DetailProductPage/DetailProductPage"
import EditProductPage from "./components/views/EditProductPage/EditProductPage"
import AdminPage from "./components/views/AdminPage/AdminPage";

function App() {
  const AuthStartPage = Auth(StartPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthSignUpPage = Auth(SignUpPage, false);
  const AuthUploadProductPage = Auth(UploadProductPage, true);
  const AuthDetailProductPage = Auth(DetailProductPage, null);
  const AuthEditProductPage = Auth(EditProductPage, true);
  const AuthAdminPage = Auth(AdminPage, true, true);  // 관리자 전용 페이지

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<AuthStartPage />} />
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/signUp" element={<AuthSignUpPage />} />
            <Route path="/admin" element={<AuthAdminPage />} />
            <Route path="/product/upload" element={<AuthUploadProductPage />} />
            <Route path="/product/update/:productId" element={<AuthEditProductPage />} />
            <Route path="/product/:productId" element={<AuthDetailProductPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;