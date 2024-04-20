import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Card, Button } from "flowbite-react";
import moment from "moment";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; //
import ReactCountryFlag from 'react-country-flag';

const JobDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => {
        setJob(res.data.job);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!isAuthorized) {
      // navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    navigateTo("/notfound");
    return null;
  }

  return (
    <section className="py-12 w-full bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300">
      <div className=" mx-auto px-4 lg:px-0">
        <h3 className="text-3xl lg:text-4xl font-semibold text-center text-gray-800 mb-6">Job Details</h3>
        <div className="max-w-lg mx-auto">
          <div className="rounded-md shadow-md p-6 0">
          <h2 className="text-sm font-semibold mb-4">
            Country <ReactCountryFlag countryCode="ET" svg />
            </h2>
            <div className="mb-4 flex gap-3">
              <h4 className="text-xl lg:text-xl font-semibold text-gray-900">posted By:</h4>
              <p className="text-gray-700 text-xl">{job.postedBy.name}</p>
            </div>
            <div className="mb-4 flex gap-3">
              <h4 className="text-xl lg:text-xl font-semibold text-gray-900">Job:</h4>
              <p className="text-gray-700 text-xl">{job.title}</p>
            </div>
            <div className="mb-4 flex gap-3">              
            <FaMapMarkerAlt icon="map-marker" className="" /><span>{job.city}, {job.country}</span>
            </div>
            <div className="mb-4 ">
              <h4 className="text-xl  font-semibold text-gray-900">Description:</h4>
              <p className="text-gray-700 text-sm">{job.description}</p>
            </div>
            <div className="mb-4 flex gap-3">
              <h4 className="text-xl lg:text-xl font-semibold text-gray-900">Job Posted On:</h4>
              <p className="text-gray-700 ">{moment(job.jobPostedOn).format("MMMM Do, YYYY")}</p>
            </div>
            <div className="mb-4 flex gap-3">
              <h4 className="text-xl lg:text-xl font-semibold text-gray-900">Salary:</h4>
              <p className="text-gray-700 ">
                {job.fixedSalary ? `${job.fixedSalary} birr` : `$${job.salaryFrom} - $${job.salaryTo}`}
              </p>
            </div>
            {user && user.role !== "Employer" && (
              <Link
                to={`/application/${job._id}`}
                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 via-indigo-500 text-white rounded-md transition duration-300 hover:bg-blue-600 text-center"
              >
                Apply Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
