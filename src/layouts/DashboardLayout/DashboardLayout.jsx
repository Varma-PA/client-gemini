import React from "react";
import { Outlet } from "react-router-dom";
import "./dashboardLayout.scss";

const DashboardLayout = () => {
  return (
    <div className="dashboardLayout">
      <div className="menu">MENU</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
