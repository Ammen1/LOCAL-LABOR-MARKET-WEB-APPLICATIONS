import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiHeart,
  HiAnnotation,
  HiChartPie,
  HiPlus
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function DashSidebar() {
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
    <Sidebar className=" md:w-56   bg-cyan-600 ">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col space-y-5">
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          <Link to="/dashboard?tab=users">
            <Sidebar.Item
              active={tab === "users"}
              icon={HiUser}
              labelColor="dark"
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
               Create  accounts
              </Sidebar.Item>
            </Link>
            <>
              <Link to="/dashboard?tab=reviews">
                <Sidebar.Item
                  active={tab === "reviews"}
                  icon={ HiHeart}
                  as="div"
                >
                  reviews
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                task lifecycle
                </Sidebar.Item>
              </Link>
            </>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
