import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Button, Card, Spinner } from "flowbite-react";
import debounce from 'lodash/debounce'; 
import { FaSearch } from "react-icons/fa";
import { ToastIcon } from "react-hot-toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8); 
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://local-labor-market-web-applications.onrender.com/api/v1/job/getall", { withCredentials: true });
        const filteredJobs = response.data.jobs.filter(job => job.paid === true); 
        setJobs(filteredJobs);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      // navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const debouncedSearch = debounce((searchQuery) => {
    setSearchQuery(searchQuery);
  }, 100); 

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    debouncedSearch(searchQuery); 
    setCurrentPage(1); 
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="container mt-20 flex justify-center items-center ml-44 w-full ">
      <div className="mx-auto">
        <div size="2xl" className="text-center text-3xl mb-6 font-bold"> Book Your Next Task</div>
        <div className="mb-4 border font-bold w-full flex items-center">
          <FaSearch className="text-green-950" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for jobs..."
            className="border-green-800 p-2 w-full font-bold outline-none"
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner color="blue" />
          </div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
              {currentJobs.map((job) => (
                <Link to={`/job/${job._id}`} key={job._id}>
                  <Card className="max-w-sm">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {job.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Category: {job.category}<br />
                      Location: {job.location}<br />
                      Salary: {job.fixedSalary} birr<br />
                      Posted On: {new Date(job.jobPostedOn).toLocaleDateString()}
                    </p>
                    <Button outline className='' >
                      Read more
                      <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, i) => (
                <Button
                outline
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-2 rounded-lg text-black ${currentPage === i + 1 ? 'bg-gradient-to-r from-indigo-500 to-pink-500 via-indigo-500 text-black' : 'hover:bg-gradient-to-r from-indigo-500 to-pink-500 hover:text-black'}`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Jobs;
