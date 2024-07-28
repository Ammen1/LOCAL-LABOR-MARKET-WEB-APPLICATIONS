import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import { Card, Spinner } from "flowbite-react";
import { MdOutlineDesignServices,} from "react-icons/md";

const PopularCategories = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthorized } = useContext(Context);
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
   
   
    
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://local-labor-market-web-applications.onrender.com/api/v1/job/getall", { withCredentials: true });
        const filteredJobs = response.data.jobs.filter(job => job.paid === true); 
        const sortedJobs = filteredJobs.sort((a, b) => b.fixedSalary - a.fixedSalary); 
        const topFourJobs = sortedJobs.slice(0, 4); 
        setJobs(topFourJobs);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="categories h-screen bg-gradient-to-bl from-violet-100 to-teal-300 via-sky-200 py-8">
      <div className="container mt-4 mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-10">POPULAR CATEGORIES</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            <Spinner color="blue" />
          ) : error ? (
            <p>Error loading categories: {error}</p>
          ) : (
            jobs.map((job) => (
              <Link to={`/job/${job._id}`} key={job._id}>
                <Card className="bg-gradient-to-tl from-slate-100 to-gray-200 via-zinc-300 rounded-lg shadow-md overflow-hidden">
                  <MdOutlineDesignServices />
                  <div className="p-10 flex items-center">
                    {/* Render job information here */}
                    <div>
                      <p className="text-lg font-semibold">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.category}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
