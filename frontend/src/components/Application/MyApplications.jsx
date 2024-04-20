import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { Button, Card } from "flowbite-react";
import ReviewModal from "./ReviewModal";
import Ava from "../../assets/Ava.jpeg";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Importing Font Awesome icons

import { FaStar } from 'react-icons/fa';

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedApplicantID, setSelectedApplicantID] = useState(null); // Rename to selectedApplicantID
  const [reviews, setReviews] = useState([]); // New state to store reviews
  const [jobSeekerId, setJobSeekerId] = useState("");
  const [jobSeekerData, setJobSeekerData] = useState(null);
  const [showJobSeekerDetails, setShowJobSeekerDetails] = useState(false);
  const [showFullCoverLetter, setShowFullCoverLetter] = useState(false);

  const toggleCoverLetterVisibility = () => {
    setShowFullCoverLetter(!showFullCoverLetter);
  };


  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();



const fetchAllReviews = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/user/reviews");
    const { data } = response;
    setReviews(data);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
  }
};

const fetchReviewsByJobSeekerId = async (jobSeekerId) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/user/reviews/${jobSeekerId}`);
    const { data } = response;
    setReviews(data); // Update reviews state with the reviews for the specific job seeker
  } catch (error) {
    console.error("Error fetching reviews by Job Seeker ID:", error);
  }
};

useEffect(() => {
  fetchAllReviews();
}, []);

useEffect(() => {
  console.log("Reviews:", reviews);
}, [reviews]);

useEffect(() => {
  if (jobSeekerId) { // Check if jobSeekerId is not empty
    fetchReviewsByJobSeekerId(jobSeekerId); // Fetch reviews for the specific job seeker
  }
}, [jobSeekerId]); // Add jobSeekerId to the dependency array

  useEffect(() => {
    try {
      if (!isAuthorized) {
        navigateTo("/");
        return;
      }

      const fetchApplications = async () => {
        let endpoint;
        if (user && user.role === "Employer") {
          endpoint = "application/employer/getall";
        } else {
          endpoint = "application/jobseeker/getall";
        }

        const response = await axios.get(`http://localhost:4000/api/v1/${endpoint}`, {
          withCredentials: true,
        });

        setApplications(response.data.applications);
      };

      fetchApplications();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, navigateTo, user]);


  const deleteApplication = async (id) => {
    if (user && user.role === "Job Seeker") {
      try {
        await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        });

        setApplications((prevApplications) =>
          prevApplications.filter((application) => application._id !== id)
        );
        toast.success("Application deleted successfully!");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleReviewClick = async (applicantID) => {
    if (user && user.role === "Employer") {
      setSelectedApplicantID(applicantID);
      setShowReviewModal(true);
    }
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/application/applications/${id}/accept`);
      console.log(response.data);
      toast.success("Application accepted successfully!");
    } catch (error) {
      toast.error("Failed to accept application. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/application/applications/${id}/reject`);
      console.log(response.data);
      toast.success("Application rejected successfully!");
    } catch (error) {
      toast.error("Failed to reject application. Please try again.");
    }
  };

  const paymentApproval = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/application/applications/${id}/paymentApproval`);
      console.log(response.data);
      toast.success("Application paymentApproval successfully!");
    } catch (error) {
      toast.error("Failed to paymentApproval application. Please try again.");
    }
  };

  const getStatusMessage = (application) => {
    if (user && user.role === "Job Seeker") {
      if (application.status === "Rejected") {
        return "We're sorry, your application has been rejected.";
      } else if (application.status === "Pending") {
        return "Your application is pending.";
      } else {
        return "Congratulations! Your application has been accepted.";
      }
    }
  };

  return (
    <section className="page w-full gap-20 bg-gradient-to-b from-slate-50 to-purple-100 via-slate-200">
      <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-white to-zinc-100 via-slate-500">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          {user && user.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-1">
          {applications.map((application) => (
            <div key={application._id} className="bg-white rounded-lg shadow-lg overflow-hidden w-full mb-8">
              <div className="p-6 w-full">
              <div className="border shadow-lg w-44 h-44 rounded-full gap-20 justify-center items-center  mt-8 bg-gradient-to-r from-stone-100 to-lime-100 via-white">
                  <img
                    src={application.resume.url}
                    alt="Resume"
                    className="cursor-pointer  rounded-full"
                    onClick={() => openModal(application.resume.url)}
                  />
                  </div>
              <div className="mb-4 leading-7 flex items-center gap-9">
                <div className="flex-1">
                <h2 className="text-lg font-bold ml-10  mb-2"> <span className=" bg-gradient-to-tl  from-slate-100 to-purple-500 via-slate-100">{application.name}</span></h2>
                  <div className="  text-4xl text-black">{getStatusMessage(application)}</div>
                  <div className="text-sm">
                <div className=" p-4 mb-4 rounded-md flex gap-5">
                  <FaEnvelope icon="envelope" className="mr-2 text-lg  bg-gradient-to-tl from-slate-100 to-purple-500 via-slate-100 " /><span>{application.email}</span><br />
                  <FaPhone icon="phone" className="mr-2 text-lg bg-gradient-to-tl from-slate-100 to-purple-500 via-slate-100" /><span>{application.phone}</span> <br />              
                  <FaMapMarkerAlt icon="map-marker" className="mr-2 text-lg  bg-gradient-to-tl from-slate-100 to-purple-500 via-slate-100" /><span>{application.address}</span><br />
                  
                </div>
                <p className="text-sm bg-gradient-to-br from-white to-neutral-50 via-white">
                {showFullCoverLetter ?application. coverLetter : `${application.coverLetter.slice(0, 400)}...`}
                {!showFullCoverLetter && (
                  <button onClick={toggleCoverLetterVisibility} className="text-blue-500 hover:underline ml-1">
                    Read More
                  </button>
                )}
              </p>
              </div>
              </div>
              {/* <div className="ml-4 w-18 h-16 rounded-full self-center">
                <img src={Ava} alt="log" width={20} height={20} className="w-16 h-16 rounded-full" />
              </div> */}
              </div>
                <div className=" justify-between w-full items-center gap-5 space-x-reverse">
                  {user && user.role === "Job Seeker" && (
                    <Button
                      onClick={() => deleteApplication(application._id)}
                      className="bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </Button>
                  )}
                  {user && user.role === "Employer" && (
                    <div className="flex gap-4">
                      <Button
                        onClick={() => handleAccept(application._id)}
                        disabled={application.status === "Accepted" || application.status === "Rejected"}
                        className="bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleReject(application._id)}
                        disabled={application.status === "Accepted" || application.status === "Rejected"}
                        className="bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                      >
                        Reject
                      </Button>
                      <Button // Change to Card component
                        onClick={() => handleReviewClick(application.applicantID)} // Pass applicantID
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 via-indigo-500 text-white rounded-md transition duration-300  cursor-pointer"
                      >
                        Give Reviews
                      </Button>
                      <Button // Change to Card component
                        onClick={() => paymentApproval(application._id)} // Pass applicantID
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 via-indigo-500 text-white rounded-md transition duration-300  cursor-pointer"
                      >
                        Approve Payment
                      </Button>
                    </div>
                  )}

                </div>
                <div className="bg-gradient-to-r mt-10  from-slate-300 to-purple-50 via-gray-50">
                <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    // Check if both user and review.applicantID.user are defined and their IDs match
                    user && user._id && review.applicantID && review.applicantID.user && user._id === review.applicantID.user._id && (
                      <li key={index}>
                        <div className="rounded-full s space-x-6 flex">
                          <img src={Ava} alt="log" width={20} height={20} className="w-16 h-16 rounded-full" />
                          <span className="mt-5 text-2xl">{review.applicantID.user.name}</span><br /> 
                        </div>
                        <span><strong>Tasker Provider name { " " }</strong> {review.employerID.user.name}</span><br /> 
                        <p className=" text-sm">
                        {showFullCoverLetter ?review.comment : `${review.comment.slice(0, 400)}...`}
                        {!showFullCoverLetter && (
                        <button onClick={toggleCoverLetterVisibility} className="text-blue-500 hover:underline ml-1">
                          Read More
                        </button>
                        )}
                        </p>
                        </li>
                    )
                  ))
                ) : (
                  <li>No reviews available</li>
                )}
              </ul>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
      {showReviewModal && (
        <ReviewModal
          onClose={handleCloseReviewModal}
          jobSeekerId={selectedApplicantID} // Pass selectedApplicantID
        />
      )}
    </section>
  );
};

export default MyApplications;


const ApplicationCard = ({ application, deleteApplication, openModal, handleReviewClick, user }) => {

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <div className="p-6">
      <div className="mb-4 leading-7 flex items-center">
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-2">
          Name: {application.name}
        </h2>
        <p className="text-sm">
          Email: {application.email}
        </p>
        <p className="text-sm">
          Phone: {application.phone}
        </p>
        <p className="text-sm">
          Address: {application.address}
        </p>
        <p className="text-sm">
          Cover Letter: {application.coverLetter}
        </p>
      </div>
      <div className="ml-4 w-18 h-16 rounded-full border-2 self-center ">
        <img src={Ava} alt="log" width={20} height={20} className="w-16 h-16 rounded-full" />
      </div>
    </div>

        <div className="flex justify-between w-full items-center gap-5">
        <div className="border shadow-lg rounded-md overflow-hidden">
          <img
            src={application.resume.url}
            alt="Resume"
            className="cursor-pointer w-24 h-24 object-cover"
            onClick={() => openModal(application.resume.url)}
          />
        </div>
      </div>
        {user && user.role === "Job Seeker" && (
            <Button
              onClick={() => deleteApplication(application._id)}
              className="bg-red-500 text-white rounded-md hover:bg-red-600 transition mt-10 duration-300"
            >
              Delete
            </Button>
          )}
          {user && user.role === "Employer" && (
            <Button
              onClick={() => handleReviewClick(application.jobSeekerId)}
              className=" bg-gradient-to-r from-indigo-500 to-pink-500 via-indigo-500 mt-10 text-white rounded-md "
            >
              Add Review
            </Button>
          )}
      </div>

    </div>
  );
};
