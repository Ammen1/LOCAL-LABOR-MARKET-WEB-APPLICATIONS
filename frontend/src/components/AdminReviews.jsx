import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [jobSeekerId, setJobSeekerId] = useState("");
  const [jobSeekerData, setJobSeekerData] = useState(null);
  const [showJobSeekerDetails, setShowJobSeekerDetails] = useState(false);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/reviews");
      const { data } = response;
      setReviews(data);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
    }
  };

  const fetchReviewsByJobSeekerId = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/user/reviews/${jobSeekerId}`);
      const { data } = response;
      setReviews(data.reviews);
      setJobSeekerData(data.jobSeeker);
    } catch (error) {
      console.error("Error fetching reviews by Job Seeker ID:", error);
    }
  };

  const handleJobSeekerChange = (event) => {
    setJobSeekerId(event.target.value);
  };

  const toggleJobSeekerDetails = () => {
    setShowJobSeekerDetails(!showJobSeekerDetails);
  };

  const fetchReviewsByJobSeekerIdOnClick = async () => {
    await fetchReviewsByJobSeekerId();
    toggleJobSeekerDetails();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Reviews</h2>
      <div className="mb-4">
        <label htmlFor="jobSeekerId" className="block text-sm font-medium text-gray-700">Enter Job Seeker ID:</label>
        <input
          type="text"
          id="jobSeekerId"
          name="jobSeekerId"
          value={jobSeekerId}
          onChange={handleJobSeekerChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter Job Seeker ID"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
          onClick={fetchReviewsByJobSeekerId}
        >
          Fetch Reviews by Job Seeker ID
        </button>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={toggleJobSeekerDetails}
      >
        {showJobSeekerDetails ? "Hide Job Seeker Details" : "Show Job Seeker Details"}
      </button>
      {showJobSeekerDetails && jobSeekerData && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Job Seeker Details</h3>
          <p><strong>Name:</strong> {jobSeekerData.name}</p>
          <p><strong>Email:</strong> {jobSeekerData.email}</p>
          <p><strong>Phone:</strong> {jobSeekerData.phone}</p>
          <p><strong>Address:</strong> {jobSeekerData.address}</p>
          <p><strong>Other Details:</strong> {jobSeekerData.otherDetails}</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table w-full whitespace-nowrap bg-white divide-y divide-gray-200 overflow-hidden rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Employer</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{review.employerID && review.employerID.user ? review.employerID.user.name : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap">{moment(review.createdAt).fromNow()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
                    onClick={fetchReviewsByJobSeekerIdOnClick}
                  >
                    Fetch Reviews by Job Seeker ID
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
