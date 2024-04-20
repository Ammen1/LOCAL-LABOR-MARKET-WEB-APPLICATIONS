import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { backgroundImage } from "../../assets";
import { Button } from "flowbite-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-purple-500 via-slate-200 bg-center" >
      <section className="container px-4 py-8 mx-auto">
        <div className="max-w-lg mx-auto bg-inherit shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-3xl font-semibold text-black mb-8 text-center">Login to your account</h3>
            <form className="text-black   rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-black">Login As</label>
                <div className="relative mt-1 text-black">
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
                  <FaRegUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-black">Email Address</label>
                <div className="relative mt-1">
                  <input
                    type="email"
                    id="email"
                    placeholder="amen@amen.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  />
                  <MdOutlineMailOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
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
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-900 to-pink-900 via-indigo-900 text-teal-50 p-1"
              >
                Login
              </Button>
              <Link to={"/register"} className="block text-center mt-4 text-sm font-semibold text-black hover:text-indigo-500">
                Register Now
              </Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
