import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSibar";
// import DashProfile from "../components/DashProfile";
// import DashPosts from "../components/DashPosts";
// import DashUsers from "../components/DashUsers";
import DashboardComp from "../components/DashboardComp";
import DashCreateAccount from "../components/DashCreateAccount";
import DashUsers from "../components/DashUsers";
// import Expenses from "../components/Expenses";
// import CreateProject from "./CreateProjects";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56 h-screen">
        {/* Sidebar */}
        <DashSidebar />
      </div>
  
      {tab === "createaccount" && <DashCreateAccount />}
      {tab === "users" && <DashUsers />}   
      {tab === "dash" && <DashboardComp />}

    </div>
  );
}
