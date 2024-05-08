import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [jobSeekerData, setJobSeekerData] = useState(null);
  const [showJobSeekerDetails, setShowJobSeekerDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByRating, setSortByRating] = useState(false);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  useEffect(() => {
    setFilteredReviews(reviews); // Initialize filteredReviews with all reviews initially
  }, [reviews]);

  useEffect(() => {
    // Filter reviews based on search query
    const filtered = reviews.filter((review) =>
      review.employerID && review.employerID.user
        ? review.employerID.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchQuery.toLowerCase())
        : false
    );
    setFilteredReviews(filtered);
  }, [searchQuery, reviews]);

  // useEffect(() => {
  //   // Sort filtered reviews by rating
  //   const sortedReviews = [...filteredReviews].sort((a, b) => {
  //     if (sortByRating) {
  //       return b.rating - a.rating;
  //     } else {
  //       return a.rating - b.rating;
  //     }
  //   });
  //   setFilteredReviews(sortedReviews);
  // }, [sortByRating, filteredReviews]);

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/reviews");
      const { data } = response;
      setReviews(data);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by employer name or comment"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="ml-4 flex items-center space-x-2">
          <input type="checkbox" checked={sortByRating} onChange={() => setSortByRating(!sortByRating)} />
          <span className="text-sm">Sort by rating</span>
        </label>
      </div>
      {showJobSeekerDetails && jobSeekerData && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Job Seeker Details</h3>
          <p>
            <strong>Name:</strong> {jobSeekerData.name}
          </p>
          <p>
            <strong>Email:</strong> {jobSeekerData.email}
          </p>
          <p>
            <strong>Phone:</strong> {jobSeekerData.phone}
          </p>
          <p>
            <strong>Address:</strong> {jobSeekerData.address}
          </p>
          <p>
            <strong>Other Details:</strong> {jobSeekerData.otherDetails}
          </p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table ml-44 whitespace-nowrap bg-white divide-y divide-gray-200 overflow-hidden rounded-lg shadow">
          <thead className="bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300 hover:from-teal-600">
            <tr className="text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Employer</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReviews.map((review, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.employerID && review.employerID.user ? review.employerID.user.name : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap">{moment(review.createdAt).fromNow()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
