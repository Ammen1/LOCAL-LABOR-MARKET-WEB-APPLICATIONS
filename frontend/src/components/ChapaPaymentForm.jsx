import { Button } from 'flowbite-react';
import { Context } from '../main';
import { useContext, useEffect, useId, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ChapaPaymentForm = ({ email, fixedSalary, tx_ref }) => {
  const [ref, setRef] = useState(`tx-ref-${Math.floor(Math.random() * 100000)}`);
  const [amount, setAmount] = useState(fixedSalary);
  const [myJobs, setMyJobs] = useState([]);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://local-labor-market-web-applications.onrender.com/api/v1/job/getmyjobs",
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

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const response = await axios.put(`https://local-labor-market-web-applications.onrender.com/api/v1/job/update/${jobId}`, updatedJob, { withCredentials: true });
      response.paid = true
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePaymentSuccess = async (jobId, userId) => {
    try {
      const response = await axios.post('https://local-labor-market-web-applications.onrender.com/api/v1/chapa-callback', { jobId, userId });
      handleUpdateJob(jobId);
      console.log('Payment status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating payment status:', error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePaymentSuccess(tx_ref, user._id); 
    document.getElementById('chapa-payment-form').submit();
  };


  return (
    <form id="chapa-payment-form" method="POST" action="https://api.chapa.co/v1/hosted/pay">
      <input type="hidden" name="public_key" value="CHAPUBK_TEST-8DLkMH8GAlJw90aGYASXVkqbTu0hDkQ5" />
      <input type="hidden" name="tx_ref" value={ref} />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="currency" value="ETB" />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="first_name" value="FirstName" /> 
      <input type="hidden" name="last_name" value="LastName" /> 
      <input type="hidden" name="title" value="Job Title" /> 
      <input type="hidden" name="description" value="Job Description" /> 
      <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
      <input type="hidden" name="callback_url" value="https://local-labor-market-web-applications.onrender.com/api/v1/job/me" />
      <input type="hidden" name="return_url" value="https://local-labor-market-web-applications.onrender.com/api/v1/job/me" />
      <input type="hidden" name="meta[title]" value="test" />
      <Button  className=" bg-gradient-to-r to-pink-500 from-violet-700 via-indigo-500" type="submit" onClick={handleSubmit}>Pay Now</Button>
    </form>
  );
};

export default ChapaPaymentForm;
