import React, { useContext, useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewModal = ({ onClose, jobSeekerId, employerId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useContext(Context);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const reviewData = {
        applicantID: {
          user: user._id,
          role: "Job Seeker"
        },
        employerID: {
          user: user._id,
          role: "Employer"
        },
        rating: rating,
        comment: comment,
      };

      // Send the review data to the backend
      const response = await axios.post("http://localhost:4000/api/v1/user/reviews", reviewData);

      console.log("Review submitted successfully:", response.data);

      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting the review");
    }
  };

  return (
    user && user.role === "Employer" ? (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add Review</h2>
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={handleRatingChange}
              min={0}
              max={5}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Comment:</label>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              rows={4}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} className="mr-2 bg-blue-500 text-white">
              Submit
            </Button>
            <Button onClick={onClose} className="bg-gray-300 text-gray-700">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Unauthorized</h2>
          <p className="mb-4">You are not authorized to submit reviews.</p>
          <div className="flex justify-end">
            <Button onClick={onClose} className="bg-gray-300 text-gray-700">
              Close
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReviewModal;
