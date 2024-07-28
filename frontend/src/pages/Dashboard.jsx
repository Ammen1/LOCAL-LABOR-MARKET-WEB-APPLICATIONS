import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSibar";
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
    <div className=" flex flex-col md:flex-row ">
      <div className=" ">
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
