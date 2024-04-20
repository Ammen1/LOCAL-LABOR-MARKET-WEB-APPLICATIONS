import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Button, Spinner } from "flowbite-react";
import debounce from 'lodash/debounce'; 
import { FaSearch } from "react-icons/fa";

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
        const response = await axios.get("http://localhost:4000/api/v1/job/getall", { withCredentials: true });
        const filteredJobs = response.data.jobs.filter(job => job.paid === true); // Filter out jobs where paid is false
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
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);


  const debouncedSearch = debounce((searchQuery) => {
    setSearchQuery(searchQuery);
  }, 100); 

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    debouncedSearch(searchQuery); 
    setCurrentPage(1); 
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="mt-20 flex justify-center items-center  ">
      <div className="mx-auto ">
        <div size="2xl" className="text-center text-3xl mb-6 font-bold"> Book Your Next Task</div>
        <div className="mb-4 border font-bold w-full flex items-center">
        <FaSearch className="  text-green-950" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Describe One Task... for example, fix hole in my wall..."
          className="border-green-800 p-2 w-full font-bold outline-none"
        />
       
      </div>
        {loading ? (
          <div className="flex justify-center items-center h-64 ">
            <Spinner color="blue" />
          </div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6   sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
              {currentJobs.map((job) => (
                <Link to={`/job/${job._id}`} key={job._id}>
                  <Button outline className="w-56 border    ">
                    <span className=" text-green-500 font-extrabold text-sm">{job.title}</span> 
                  </Button>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, i) => (
                <Button
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
