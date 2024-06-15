import { Sidebar } from "flowbite-react";
import { HiUser, HiHeart, HiAnnotation, HiChartPie, HiPlus, HiOutlinePlay, HiPlay, HiOutlinePaperAirplane } from "react-icons/hi";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { GiHedjetWhiteCrown } from "react-icons/gi";

export default function DashSidebar() {
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  if (!isAuthorized || (user && user.role !== "Admin")) {
    navigateTo("/");
  }
  return (
    <Sidebar className=" bg-slate-50">
      <Sidebar.Items className="">
        <Sidebar.ItemGroup className="flex flex-col space-y-3  ">
          <Link to="/dashboard?tab=dash">
            <Sidebar.Item
              active={tab === "dash" || !tab}
              icon={HiChartPie}
              as="div"
              className=" bg-white"
            >
              Dashboard Component
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=users">
            <Sidebar.Item
              active={tab === "users"}
              icon={HiUser}
              as="div"
            >
              Manage accounts
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=createaccount">
            <Sidebar.Item
              active={tab === "createaccount"}
              icon={HiPlus}
              as="div"
            >
              Create accounts
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=reviews">
            <Sidebar.Item
              active={tab === "reviews"}
              icon={HiHeart}
              as="div"
            >
              Reviews
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=lifecycle">
            <Sidebar.Item
              active={tab === "lifecycle"}
              icon={HiAnnotation}
              as="div"
            >
              Task Lifecycle
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=applications">
            <Sidebar.Item
              active={tab === "applications"}
              icon={HiOutlinePaperAirplane}
              as="div"
            >
              Task Applications
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=payment">
            <Sidebar.Item
              active={tab === "payment"}
              icon={HiPlay}
              as="div"
            >
              Payment
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=joboffer">
            <Sidebar.Item
              active={tab === "joboffer"}
              icon={GiHedjetWhiteCrown}
              as="div"
            >
             Job Offer
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
