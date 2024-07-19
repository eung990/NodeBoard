import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import StartPage from "./components/views/StartPage/StartPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";

function App() {
  return (
    <BrowserRouter>
    <div>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <Routes>
        <Route exact path="/" element={StartPage()}/>
         
        <Route exact path="/loginPage" element={LoginPage()}/>
        
        <Route exact path="/SignUpPage" element={SignUpPage()}/>
        
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
