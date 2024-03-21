import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Card } from "flowbite-react";

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
      navigateTo("/login");
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
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 lg:px-0">
        <h3 className="text-xl lg:text-3xl text-gray-800 font-semibold mb-6 text-center">Job Details</h3>
        <div className="mx-auto max-w-lg">
          <Card className="bg-white shadow-md rounded-md p-6">
            <div className="text-gray-700 mb-4">
              <span className="font-semibold">Title:</span> {job.title}
            </div>
            <div className="text-gray-700 mb-4">
              <span className="font-semibold">Category:</span> {job.category}
            </div>
            <div className="text-gray-700 mb-4">
              <span className="font-semibold">Country:</span> {job.country}
            </div>
            <div className="text-gray-700 mb-4">
              <span className="font-semibold">City:</span> {job.city}
            </div>
            <div className="text-gray-700 mb-4">
              <span className="font-semibold">Location:</span> {job.location}
            </div>
            <div className="text-gray-700 mb-4">
              <span className="font-semibold">Description:</span> {job.description}
            </div>
            <div className="text-gray-700 mb-4">
              <span className="font-semibold">Job Posted On:</span> {job.jobPostedOn}
            </div>
            <div className="text-gray-700 mb-4">
              <span className="font-semibold">Salary:</span>{" "}
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </div>
            {user && user.role !== "Employer" && (
              <Link
                to={`/application/${job._id}`}
                className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 via-indigo-500 text-white rounded-md transition duration-300 hover:bg-blue-600 text-center"
              >
                Apply Now
              </Link>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
