import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

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
    <nav className={`bg-[#1d4ed8] ${isAuthorized ? "block" : "hidden"}`}>

      <div className="container mx-auto flex justify-between items-center ">
        <div className="logo flex items-center">
          <img src="/JobZee-logos__white.png" alt="logo" className="h-10 mr-4" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu "} >
          <li className="hover:text-gray-300">
            <Link to={"/"} onClick={() => setShow(false)} className="items-center space-x-4 text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}  className="items-center space-x-4 text-white">
              AllTasks
            </Link>
          </li>
          <li className=" text-sm">
            <Link to={"/applications/me"} onClick={() => setShow(false)}  className="items-center space-x-4 text-white">
              {user && user.role === "Employer"
                ? "Applicant's Applications"
                : "My Appliaction"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}  className="items-center space-x-4 text-white">
                  PostTask
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}  className="items-center space-x-4 text-white">
                  ViewTasks
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
           {user && user.role === "Admin" ? (
            <>
              <li>
                <Link to={"/dashboard?tab=dash"} onClick={() => setShow(false)}  className="items-center space-x-4 text-white">
                 Dashboard
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button  onClick={handleLogout}>logout</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
