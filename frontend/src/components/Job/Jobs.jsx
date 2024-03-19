import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Card } from "flowbite-react";



const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/job/getall", { withCredentials: true });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="jobs page">
      <div className="mx-auto py-8">
        <div size="2xl" className="text-center  mb-8">ALL AVAILABLE JOBS</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <p className="text-xl font-semibold mb-2">{job.title}</p>
                <p className="text-lg mb-2">{job.category}</p>
                <p className="text-lg mb-4">{job.country}</p>
                <Link to={`/job/${job._id}`} className="text-blue-500 hover:underline">Job Details</Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
