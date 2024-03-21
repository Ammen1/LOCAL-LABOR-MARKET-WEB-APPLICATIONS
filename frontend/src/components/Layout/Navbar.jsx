import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, Navbar as BrowiserNav } from "flowbite-react";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <BrowiserNav className={`bg-blue-700 space-x-5 ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center ">
        <Link
        to="/"
        className="self-center py-2 whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-2 bg-gradient-to-r from-indigo-500  rounded-lg text-white">
        Local Labor  
        </span>
        Market
      </Link>
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li className="hover:text-gray-300">
            <Link to={"/"} onClick={() => setShow(false)} className="items-center space-x-4 text-white text-sm">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)} className="items-center space-x-4 text-white text-sm">
              AllTasks
            </Link>
          </li>
          <li className=" text-sm">
            <Link to={"/applications/me"} onClick={() => setShow(false)} className="items-center space-x-4 text-white text-sm">
              {user && user.role === "Employer" ? "Applicant's Applications" : "My Appliaction"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)} className="items-center space-x-4 text-white text-sm">
                  PostTask
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)} className="items-center space-x-4 text-white text-sm">
                  ViewTasks
                </Link>
              </li>
            </>
          )}
          {user && user.role === "Admin" && (
            <>
              <li>
                <Link to={"/dashboard?tab=dash"} onClick={() => setShow(false)} className="items-center space-x-4 text-white text-sm">
                  Dashboard
                </Link>
              </li>
            </>
          )}
          <li>
            <Button gradientDuoTone="purpleToBlue" className=" p-1"  onClick={handleLogout}>
              Sign out
            </Button>
          </li>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </BrowiserNav>
  );
};

export default Navbar;
