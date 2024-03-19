import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import ChapaPaymentForm from "../ChapaPaymentForm";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);

  const handlePaymentClick = () => {
    setIsPaymentClicked(true);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, { withCredentials: true });
      toast.success(response.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, { withCredentials: true });
      toast.success(response.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  const handlePay = async (job) => {
    try {
      // Replace the following code with your Chapa payment integration logic
      const response = await axios.post("https://api.chapa.co/v1/hosted/pay", {
        public_key: "CHAPUBK_TEST-8DLkMH8GAlJw90aGYASXVkqbTu0hDkQ5",
        tx_ref: job._id, // You can use the job ID as the transaction reference
        amount: job.salaryTo, // Use the salary or appropriate amount from the job
        currency: "ETB", // Or any other currency supported by Chapa
        email: user.email, // Use user email or any valid email
        first_name: user.firstName, // Use user's first name
        last_name: user.lastName, // Use user's last name
        title: job.title,
        description: job.description,
        callback_url: "http://localhost:5173/job/me",
        return_url: "http://localhost:5173/job/me",
        meta: {
          title: "test",
        },
      });
      console.log(response.data);
      // Handle payment response as needed
      // You can redirect user to the payment URL, show payment modal, etc.
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while processing payment");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Posted Jobs</h1>
      {myJobs.length > 0 ? (
        <div className="grid grid-cols-1 max-w-screen-lg gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myJobs.map((job) => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{job.country}</h2>
                <h2 className="text-xl font-semibold mb-4">location: {job.location}</h2>
                <h2 className="text-xl font-semibold bg-gradient-to-r to-pink-900 mb-4">{job.title}</h2>
                <div className="mb-4">
                  <span className="font-semibold">Country:</span>
                  <input
                    type="text"
                    className="ml-2 focus:outline-none"
                    value={job.country}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <span className="font-semibold">City:</span>
                  <input
                    type="text"
                    className="ml-2 focus:outline-none"
                    value={job.city}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Category:</span>
                  <select
                    className="ml-2 focus:outline-none"
                    value={job.category}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                  >
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    {/* Add more options similarly */}
                  </select>
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Salary:</span>
                  {job.fixedSalary ? (
                    <input
                      type="number"
                      className="ml-2 focus:outline-none"
                      value={job.fixedSalary}
                      disabled={editingMode !== job._id}
                      onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                    />
                  ) : (
                    <>
                      <input
                        type="number"
                        className="ml-2 focus:outline-none"
                        value={job.salaryFrom}
                        disabled={editingMode !== job._id}
                        onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                      />
                      <span className="mx-2">to</span>
                      <input
                        type="number"
                        value={job.salaryTo}
                        disabled={editingMode !== job._id}
                        onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                      />
                    </>
                  )}
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Expired:</span>
                  <select
                    className="ml-2 focus:outline-none"
                    value={job.expired}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "expired", e.target.value)}
                  >
                    <option value={true}>TRUE</option>
                    <option value={false}>FALSE</option>
                  </select>
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Description:</span>
                  <textarea
                    rows={5}
                    className="w-full focus:outline-none"
                    value={job.description}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Location:</span>
                  <textarea
                    rows={5}
                    className="w-full focus:outline-none"
                    value={job.location}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "location", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Paid:</span>
                  <textarea
                    rows={5}
                    className="w-full focus:outline-none"
                    value={job.paid}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "paid", e.target.value)}
                  />
                </div>
                <>
                  <Button className="bg-gradient-to-r to-pink-500 from-violet-700 via-indigo-500" onClick={handlePaymentClick}>Choose payment gateway</Button>
                  {isPaymentClicked && <ChapaPaymentForm email={user.email} fixedSalary={job.fixedSalary} jobId={job._id} />}
                </>
              </div>
              <div className="flex justify-between items-center px-6 py-4">
                {editingMode === job._id ? (
                  <>
                    <button className="text-green-500" onClick={() => handleUpdateJob(job._id)}>
                      <FaCheck />
                    </button>
                    <button className="text-red-500" onClick={handleDisableEdit}>
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <Button className="text-blue-500" onClick={() => handleEnableEdit(job._id)}>
                    <FaEdit />
                  </Button>
                )}
                <button className="text-red-500" onClick={() => handleDeleteJob(job._id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8">You've not posted any job or maybe you deleted all of your jobs!</p>
      )}
    </div>
  );
};

export default MyJobs;
