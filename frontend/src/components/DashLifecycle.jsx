import React, { useContext, useEffect, useState } from "react";
import moment from "moment"
import { Button } from 'flowbite-react';
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export default function DashLifecycle() {
  const { user } = useContext(Context);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/job/getall");
        const data = await response.json();
        if (data.success) {
          setJobs(data.jobs);
        } else {
          console.error("Error fetching jobs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const deleteApplication = async (id) => {
    if (user && user.role === "Admin") {
      try {
        await axios.delete(`http://localhost:4000/api/v1/delete/${id}`, {
          withCredentials: true,
        });

        setApplications((prevApplications) =>
          prevApplications.filter((application) => application._id !== id)
        );
        toast.success("Application deleted successfully!");
      } catch (error) {
        toast.error(error.response.data.message, "Fail To Delete");
      }
    }
  };

  return (
    <div className="ml-5 items-center justify-center h-full table bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300 rounded-lg shadow">
      <div className="overflow-x-auto table mt-10  whitespace-nowrap rounded-lg shadow">
        <table className="table-auto min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50 bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300 hover:from-teal-600">
            <tr className="">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase">City</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase">Fixed Salary</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase">Paid</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase">Posted By</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase">Posted On</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map(job => (
              <tr key={job.id} className="hover:bg-gray-100 transition-colors duration-300">
                <td className="px-4 py-2 whitespace-nowrap">{job.title}</td>
                <td className="px-4 py-2 whitespace-nowrap">{job.category}</td>
                <td className="px-4 py-2 whitespace-nowrap">{job.city}</td>
                <td className="px-4 py-2 whitespace-nowrap">{job.fixedSalary}</td>
                <td className="px-4 py-2 whitespace-nowrap">{job.expired}</td>
                <td className="px-4 py-2 whitespace-nowrap">{job.postedBy.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{moment(job.jobPostedOn).fromNow()}</td>
                <td className='px-6 py-4 whitespace-nowrap'><Button
                      onClick={() => deleteApplication(job._id)}
                      className="bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
