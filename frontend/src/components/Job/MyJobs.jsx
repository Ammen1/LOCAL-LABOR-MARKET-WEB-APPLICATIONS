import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { Button, Select, TextInput, Textarea } from "flowbite-react";
import ChapaPaymentForm from "../ChapaPaymentForm";
import ReactCountryFlag from 'react-country-flag';

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);
  const [showPayNowButton, setShowPayNowButton] = useState(true);

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
        console.log(data)
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

  const handlePayment = async (job) => {
    try {
      const amount = job.salaryTo || 0;
      const paymentData = {
        job: job._id,
        amount: job.fixedSalary,
        email: user.email,
        currency: "ETB",
        first_name: user.name,
        last_name: "Tamirat Ali Guda",
        tx_ref: "transaction_reference"
      };
  
      const response = await axios.post('http://localhost:4000/transactions/initiate', paymentData);
  
      if (response.data.detail && response.data.detail.status === "success") {
        const checkoutUrl = response.data.detail.data.checkout_url;
        window.location.href = checkoutUrl;
      } else {
        console.error('Invalid response from payment API:', response.data);
        // Handle invalid response
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error
    }
  };
  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300">
      <h1 className="text-3xl font-bold text-center mb-8">Your Posted Jobs</h1>
      {myJobs.length > 0 ? (
        <div className="grid grid-cols-1 max-w-screen-lg gap-6 md:grid-cols-2 lg:grid-cols-3  ">
          {myJobs.map((job) => (
            <div key={job._id} className="shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
              <h2 className="text-sm font-semibold mb-4">
              <ReactCountryFlag countryCode="ET" svg /> {job.country}
            </h2>
                <h2 className="text-sm font-semibold mb-4">location: {job.location}</h2>
                {/* <h2 className="text-sm font-semibold  mb-4"></h2> */}
                <TextInput
                    type="text"
                    className="ml-2 focus:outline-none"
                    value={job.title}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
                  />
                <div className="mb-4">
                  <span className="font-semibold text-sm">Country:</span>
                  <TextInput
                    type="text"
                    className="ml-2 focus:outline-none"
                    value={job.country}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                  />
                </div>
                <div className="mb-4 text-sm">
                  <span className="font-semibold">City:</span>
                  <TextInput
                    type="text"
                    className="ml-2 focus:outline-none"
                    value={job.city}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Category:</span>
                  <Select
                    className="ml-2 focus:outline-none"
                    value={job.category}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                  >
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                  </Select>
                </div>
                <div className="mb-4 text-sm">
                  <span className="font-semibold">Salary:</span>
                  {job.fixedSalary ? (
                    <TextInput
                      type="number"
                      className="ml-2 focus:outline-none"
                      value={job.fixedSalary}
                      disabled={editingMode !== job._id}
                      onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                    />
                  ) : (
                    <>
                      <TextInput
                        type="number"
                        className="ml-2 focus:outline-none"
                        value={job.salaryFrom}
                        disabled={editingMode !== job._id}
                        onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                      />
                      <span className="mx-2">to</span>
                      <TextInput
                        type="number"
                        value={job.salaryTo}
                        disabled={editingMode !== job._id}
                        onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                      />
                    </>
                  )}
                </div>
                <div className="mb-4 text-sm">
                  <span className="font-semibold">Expired:</span>
                  <Select
                    className="ml-2 focus:outline-none"
                    value={job.expired}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "expired", e.target.value)}
                  >
                    <option value={true}>TRUE</option>
                    <option value={false}>FALSE</option>
                  </Select>
                </div>
                <div className="mb-4 text-sm">
                  <span className="font-semibold">Description:</span>
                  <Textarea
                    rows={5}
                    className="w-full focus:outline-none"
                    value={job.description}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                  />
                </div>
                <div className="mb-4 text-sm">
                  <span className="font-semibold">Location:</span>
                  <TextInput
                    rows={5}
                    className="w-full focus:outline-none"
                    value={job.location}
                    disabled={editingMode !== job._id}
                    onChange={(e) => handleInputChange(job._id, "location", e.target.value)}
                  />
                </div>
                <>
                {job.paid !== true && (
                <>
                  <Button className="bg-gradient-to-r to-pink-500 from-violet-700 via-indigo-500" onClick={() => handlePayment(job)}>Choose payment gateway</Button>
                  {isPaymentClicked && handlePayment(job)}
                </>
              )}

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
