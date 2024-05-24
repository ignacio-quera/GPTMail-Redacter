import React from "react";
import { Outlet } from "react-router-dom";
import './Layout.css';
import Topper from "../components/Topper";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="app-container">
      <Topper />
      <Outlet />
      <Footer />
      </div>
  )
}

export default Layout;