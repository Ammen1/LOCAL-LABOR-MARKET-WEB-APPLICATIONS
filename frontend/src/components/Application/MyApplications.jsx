import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { Button, Card, Tooltip } from "flowbite-react";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {user && user.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((element) => (
            <ApplicationCard
              key={element._id}
              element={element}
              deleteApplication={deleteApplication}
              openModal={openModal}
            />
          ))}
        </div>
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const ApplicationCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <Card className="mb-4 border bg-white shadow-lg">
          <h2 className="text-lg font-bold mb-2">
            Name: {element.name}
          </h2>
          <p className="text-sm">
            Email: {element.email}
          </p>
          <p className="text-sm">
            Phone: {element.phone}
          </p>
          <p className="text-sm">
            Address: {element.address}
          </p>
          <p className="text-sm">
            Cover Letter: {element.coverLetter}
          </p>
        </Card>
        <div className="flex justify-between items-center gap-5">
        <Tooltip content="This is user cv see more" style="light" className=" bg-white p-4 text-lg ">
          <Card className=" border shadow-2xl w-full h-full border-collapse">
          <img
            src={element.resume.url}
            alt="Resume"
            className="cursor-pointer rounded-md w-24 h-24 object-cover"
            onClick={() => openModal(element.resume.url)}
          />
          </Card>
          </Tooltip>

          <Button
            onClick={() => deleteApplication(element._id)}
            className="bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
