import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Technology from "./pages/Technology";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import Map from "./pages/Map";
import Statistics from "./pages/Statistics";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import { AddressProvider } from "./contexts/AddressContext";

import InteractiveTable from "./components/stats/InteractiveTable"
import Chart from './components/stats/Chart'
import UsersTable from "./components/stats/UsersTable";

import LoginPage from "./pages/Login";
import ForgetPasswordPage from "./pages/ForgetPassword";
import SignupPage from "./pages/SignUp";
import EditProfile from "./pages/EditProfile";



function App() {
  console.log(process.env.REACT_APP_LOGIN)
  return (
    <AddressProvider> 
      <Router>
        <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="TreeRegistry" element={<Home/>}/>
            <Route path="Contact" element={<Contact/>}/>
            <Route path="Technology" element={<Technology/>}/>
            <Route path="Upload" element={<Upload/>}/>
            <Route path="trees" element={<Search/>}/>
            <Route path="map" element={<Map/>}/>
            <Route path="statistics" element={<Statistics/>}>
              <Route path="chart" element={<Chart/>}/>
              <Route path="geographic" element={<InteractiveTable/>}/>
              <Route path="top50users" element={<UsersTable/>}/>
            </Route>
            <Route path="login" element={<LoginPage/>} />
            <Route path="forget-password" element={<ForgetPasswordPage/>} />
            <Route path="signup" element={<SignupPage/>} />
            <Route path="profile" element={<EditProfile/>} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </AddressProvider>
  );
}

export default App;
