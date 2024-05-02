import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { TextInput, Label, Select, Textarea, Button } from "flowbite-react";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();

    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
      return;
    }

    try {
      const jobData = salaryType === "Fixed Salary"
        ? { title, description, category, country, city, location, fixedSalary }
        : { title, description, category, country, city, location, salaryFrom, salaryTo };

      const response = await axios.post("http://localhost:4000/api/v1/job/post", jobData, { withCredentials: true });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to post job: " + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-20">POST NEW JOB</h1>
        <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-md">
          <form onSubmit={handleJobPost} className="p-6">
            <div className="mb-4">
              <Label htmlFor="title" className="block text-sm font-semibold text-gray-600">Job Title</Label>
              <TextInput
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Job Title"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="category" className="block text-sm font-semibold text-gray-600">Category</Label>
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Category</option>
                <option value="Assembly">Assemblyn</option>
                <option value="Mounting">Mounting</option>
                <option value="Moving">Moving</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Outdoor Help">Outdoor Help</option>
                <option value="Home Repairs">Home Repairs</option>
                <option value="Painting">Painting</option>
                <option value="Trending">Trending</option>
              </Select>
            </div>
            <Label htmlFor="country" className="block text-sm font-semibold text-gray-600">Countyry</Label>
            <div className="wrapper">
              <TextInput
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <Label htmlFor="city" className="block text-sm font-semibold text-gray-600">City</Label>
              <TextInput
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <Label htmlFor="category" className="block text-sm font-semibold text-gray-600">Location</Label>
            <TextInput
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <Label htmlFor="salaryType" className="block text-sm font-semibold text-gray-600">Salary</Label>

            <div className="salary_wrapper">
              <Select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                {/* <option value="Ranged Salary">Ranged Salary</option> */}
              </Select>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <TextInput
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="">
                    {/* <TextInput
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <TextInput
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    /> */}
                  </div>
                )}
              </div>
            </div>
            <Label htmlFor="description" className="block text-sm font-semibold text-gray-600">Descriptions</Label>
            <Textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-900 to-pink-900 via-indigo-900 text-teal-50 p-1 mt-6 "
            >
              Create Job
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
