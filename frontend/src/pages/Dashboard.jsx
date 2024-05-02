import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSibar";
// import DashProfile from "../components/DashProfile";
// import DashPosts from "../components/DashPosts";
// import DashUsers from "../components/DashUsers";
import DashboardComp from "../components/DashboardComp";
import DashCreateAccount from "../components/DashCreateAccount";
import DashUsers from "../components/DashUsers";
import AdminReviews from "../components/AdminReviews.jsx";
import DashLifecycle from "../components/DashLifecycle.jsx";
import DashApplication from "../components/DashApplocation"
import DashPayment from "../components/DashPayment.jsx";
import DashJobOffer from "../components/Dashboard/DashJobOffer.jsx";

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
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="md:w-56  ">
        {/* Sidebar */}
        <DashSidebar />
      </div>
  
      {tab === "createaccount" && <DashCreateAccount />}
      {tab === "users" && <DashUsers />}   
      {tab === "dash" && <DashboardComp />}
      {tab === "reviews" && <AdminReviews />}
      {tab === "lifecycle" && <DashLifecycle />}
      {tab === "applications" && <DashApplication />}
      {tab === "payment" && <DashPayment />}
      {tab === "joboffer" && <DashJobOffer />}

    </div>
  );
}
