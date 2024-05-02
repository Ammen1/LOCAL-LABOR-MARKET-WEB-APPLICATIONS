import { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../main";
import { Button, TextInput } from "flowbite-react";
import "./Auth/Register.css";

export default function DashCreateAccount() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [headline, setHeadline] = useState(""); // Additional profile field
  const [experience, setExperience] = useState(""); // Additional profile field
  const [skills, setSkills] = useState(""); // Additional profile field
  const [education, setEducation] = useState(""); // Additional profile field
  const [location, setLocation] = useState(""); // Additional profile field
  const [linkedin, setLinkedin] = useState(""); // Additional profile field
  const [github, setGithub] = useState(""); // Additional profile field
  const [portfolio, setPortfolio] = useState(""); // Additional profile field
  const [resume, setResume] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Check if required fields for job seekers are filled out
      if (role === "Job Seeker" && (!location || !education || !experience || !headline)) {
        toast.error("Please fill out all required fields for job seekers.");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("role", role);
      formData.append("password", password);
      formData.append("resume", resume);
      formData.append("headline", headline);
      formData.append("experience", experience);
      formData.append("skills", skills);
      formData.append("education", education);
      formData.append("location", location);
      formData.append("linkedin", linkedin);
      formData.append("github", github);
      formData.append("portfolio", portfolio);
      
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      // Clear form fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setResume("");
      setHeadline("");
      setExperience("");
      setSkills("");
      setEducation("");
      setLocation("");
      setLinkedin("");
      setGithub("");
      setPortfolio("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <div className="min-h-screen w-full  bg-gradient-to-b from-slate-100 to-purple-500 via-slate-200 bg-center">
      <section className="flex items-center justify-center">
        <div className="container px-4 py-8 mx-auto fadeIn">
          <div className="max-w-lg mx-auto bg-inherit shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-3xl font-semibold text-black mb-8 text-center">
                Create a new account
              </h3>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-black"
                  >
                    Register As
                  </label>
                  <div className="relative mt-1 to-black">
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
                  <label htmlFor="name" className="block text-sm font-medium text-black">
                    Name
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="name"
                      placeholder="Abush"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <FaPencilAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-black">
                    Email Address
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      id="email"
                      placeholder="amen@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input block w-full pl-3 pr-10 text-black py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <MdOutlineMailOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-black">
                    Phone Number
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="number"
                      id="phone"
                      placeholder="0944365493"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <FaPhoneAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                  </label>
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
               
                {role === "Job Seeker" && (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="headline"
                        className="block text-sm font-medium text-black"
                      >
                        Headline
                      </label>
                      <input
                        type="text"
                        id="headline"
                        placeholder="Your headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-black"
                      >
                        Experience
                      </label>
                      <input
                        type="text"
                        id="experience"
                        placeholder="Your experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="skills"
                        className="block text-sm font-medium text-black"
                      >
                        Skills
                      </label>
                      <input
                        type="text"
                        id="skills"
                        placeholder="Your skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="education"
                        className="block text-sm font-medium text-black"
                      >
                        Education
                      </label>
                      <input
                        type="text"
                        id="education"
                        placeholder="Your education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-black"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        placeholder="Your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="linkedin"
                        className="block text-sm font-medium text-black"
                      >
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="text"
                        id="linkedin"
                        placeholder="Your LinkedIn profile URL"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="github"
                        className="block text-sm font-medium text-black"
                      >
                        GitHub Profile URL
                      </label>
                      <input
                        type="text"
                        id="github"
                        placeholder="Your GitHub profile URL"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="portfolio"
                        className="block text-sm font-medium text-black"
                      >
                        Portfolio URL
                      </label>
                      <input
                        type="text"
                        id="portfolio"
                        placeholder="Your portfolio URL"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        className="form-input block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </div>
                  </>
                )}
                 <div className="flex flex-col items-center justify-center pb-6 pt-5 ">
                  <label
                    htmlFor="resume"
                    className="mb-4 flex flex-col items-center justify-center cursor-pointer border-8 w-full bg-white"
                  >
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf, .jpg, .png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <Button
                  type="submit"
                  onClick={handleRegister}
                  className="w-full bg-gradient-to-r from-purple-900 to-pink-900 via-indigo-900 text-teal-50 p-1"
                >
                  Register
                </Button>
                <Link
                  to={"/login"}
                  className="block text-center mt-4 text-sm font-semibold text-black hover:text-indigo-500"
                >
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

