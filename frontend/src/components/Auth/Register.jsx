import { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { backgroundImage1 } from "../../assets";
import { Button } from "flowbite-react";
import "./Register.css";
import { GiPiggyBank } from "react-icons/gi";
import { SiPluralsight } from "react-icons/si";



const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

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
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage1})` }}>
      <section className="flex items-center justify-center">
        <div className="container px-4 py-8 mx-auto fadeIn">
          <div className="max-w-lg mx-auto bg-inherit shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-3xl font-semibold text-white mb-8 text-center">Create a new account</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-white">Register As</label>
                  <div className="relative mt-1">
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select Role</option>
                      <option value="Employer">Employer</option>
                      <option value="Job Seeker">Job Seeker</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <FaPencilAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="name"
                      placeholder="Abush"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <FaPencilAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      id="email"
                      placeholder="amen@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <MdOutlineMailOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-white">Phone Number</label>
                  <div className="relative mt-1">
                    <input
                      type="number"
                      id="phone"
                      placeholder="09443654"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <FaPhoneAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                  <div className="relative mt-1">
                    <input
                      type="password"
                      id="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <RiLock2Fill className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  </div>
                </div>
                <Button
                  type="submit"
                  onClick={handleRegister}
                  className="w-full bg-gradient-to-r from-purple-900 to-pink-900 via-indigo-900 text-white p-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                >
                  Register
                </Button>
                <Link to={"/login"} className="block text-center mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Login Now
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
