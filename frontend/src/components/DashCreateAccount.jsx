import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function DashCreateAccount() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="authPage flex justify-center items-center bg-gray-100 ">
      <div className="container mx-auto bg-gray-100">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="header py-6 px-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Create a new account</h3>
          </div>
          <form className="px-6 py-4" onSubmit={handleRegister}>
            <div className="inputTag mb-4">
              <label className="text-gray-700">Register As</label>
              <div className="flex items-center">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="ml-2 text-gray-500" />
              </div>
            </div>
            <div className="inputTag mb-4">
              <label className="text-gray-700">Name</label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Zeeshan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400 flex-1"
                />
                <FaPencilAlt className="ml-2 text-gray-500" />
              </div>
            </div>
            <div className="inputTag mb-4">
              <label className="text-gray-700">Email Address</label>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400 flex-1"
                />
                <MdOutlineMailOutline className="ml-2 text-gray-500" />
              </div>
            </div>
            <div className="inputTag mb-4">
              <label className="text-gray-700">Phone Number</label>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400 flex-1"
                />
                <FaPhoneFlip className="ml-2 text-gray-500" />
              </div>
            </div>
            <div className="inputTag mb-4">
              <label className="text-gray-700">Password</label>
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400 flex-1"
                />
                <RiLock2Fill className="ml-2 text-gray-500" />
              </div>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400">
              Register
            </button>
            <Link to={"/dashboard?tab=dash"} className="block text-center mt-2 text-gray-600 hover:text-gray-700">Back to Home</Link>
          </form>
        </div>
      </div>
    </section>
  );
}
