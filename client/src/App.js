import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
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
  const newStartPage = Auth(StartPage, null);
  const newLoginPage = Auth(LoginPage, false);
  const newSignUpPage = Auth(SignUpPage, false);
  const newUploadProductPage = Auth(UploadProductPage, true);
  const newDetailProductPage = Auth(DetailProductPage, null);
  const newEditProductPage = Auth(EditProductPage, true);
  const newAdminPage = Auth(AdminPage, true, );

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={newStartPage} />
            <Route path="/login" element={newLoginPage} />
            <Route path="/signUp" element={newSignUpPage} />
            <Route path="/admin" element={newAdminPage} />
            <Route path="/product/upload" element={newUploadProductPage} />
            <Route path="/product/update/:productId" element={newEditProductPage} />
            <Route path="/product/:productId" element={newDetailProductPage} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;