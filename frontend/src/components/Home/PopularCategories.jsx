import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import { Card, Spinner } from "flowbite-react";

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
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/job/getall", { withCredentials: true });
        const filteredJobs = response.data.jobs.filter(job => job.paid === true); // Filter out jobs where paid is false
        const sortedJobs = filteredJobs.sort((a, b) => b.fixedSalary - a.fixedSalary); // Sort by salary in descending order
        const topFourJobs = sortedJobs.slice(0, 4); // Take the first four jobs
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
