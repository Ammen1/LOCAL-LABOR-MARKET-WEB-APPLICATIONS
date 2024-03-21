import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { Button, Card, } from "flowbite-react";
import ReviewModal from "./ReviewModal";
import Ava from "../../assets/Ava.jpeg"


const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedJobSeekerId, setSelectedJobSeekerId] = useState(null);

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

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

  const handleReviewClick = (jobSeekerId) => {
    if (user && user.role === "Employer") {
      setSelectedJobSeekerId(jobSeekerId);
      setShowReviewModal(true);
    }
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  return (
    <section className="my_applications page w-full">
      <div className="container mx-auto px-4 py-8 flex">
        <h1 className="text-3xl font-bold text-center mb-8">
          {user && user.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {applications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              deleteApplication={deleteApplication}
              openModal={openModal}
              handleReviewClick={handleReviewClick}
              user={user} 
            />
          ))}
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
      {showReviewModal && (
        <ReviewModal
          onClose={handleCloseReviewModal}
          jobSeekerId={selectedJobSeekerId}
        />
      )}
        </div>
      </div>

    </section>
  );
};

export default MyApplications;

const ApplicationCard = ({ application, deleteApplication, openModal, handleReviewClick, user }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <div className="p-6 flex flex-col">
      <Card className="mb-4 leading-7 flex items-center">
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
    </Card>

        <div className="flex justify-between w-full items-center gap-5">
        <Card className="border shadow-lg rounded-md overflow-hidden">
          <img
            src={application.resume.url}
            alt="Resume"
            className="cursor-pointer w-24 h-24 object-cover"
            onClick={() => openModal(application.resume.url)}
          />
        </Card>
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
