import React, { useState } from "react";
import DashboardTop from "../../components/DashboardTop/DashboardTop";
import DashBoardBottom from "../../components/DashboardBottom/DashBoardBottom";

const DashBoardPage = () => {
  const [render, setRender] = useState(false);
  return (
    <div>
      <DashboardTop render={render} setRender={setRender}/>
      <DashBoardBottom render={render} setRender={setRender}/>
    </div>
  );
};

export default DashBoardPage;