import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <div className="stat-icon-box">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
