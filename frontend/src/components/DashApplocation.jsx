import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { Button } from 'flowbite-react';
import { Context } from "../main";

export default function DashApplocation() {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("https://local-labor-market-web-applications.onrender.com/api/v1/application/applications");
        const { data } = response;
        if (data && data.success && Array.isArray(data.applications)) {
          setApplications(data.applications);
        } else {
          console.error("Error: Invalid data format.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const deleteApplication = async (id) => {
    if (user && user.role === "Job Seeker") {
      try {
        await axios.delete(`https://local-labor-market-web-applications.onrender.com/api/v1/application/delete/${id}`, {
          withCredentials: true,
        });
  
        setApplications(applications.filter(app => app._id !== id));
  
        toast.success("Application deleted successfully!");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while deleting the application.");
        }
      }
    }
  };

const filteredApplications = applications.filter(application => {
  return (
    application.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    application.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof application.phone === 'string' && application.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
    application.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    application.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    application.paymentApproval.toLowerCase().includes(searchQuery.toLowerCase())
  );
});


  return (
    <div className="container mx-auto mt-10">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-200">Name</th>
              <th className="px-4 py-2 border border-gray-200">Email</th>
              <th className="px-4 py-2 border border-gray-200">Phone</th>
              <th className="px-4 py-2 border border-gray-200">Address</th>
              <th className="px-4 py-2 border border-gray-200">Status</th>
              <th className="px-4 py-2 border border-gray-200">Payment Approval</th>
              <th className="px-4 py-2 border border-gray-200">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(application => (
              <tr key={application._id} className="bg-white">
                <td className="px-4 py-2 border border-gray-200">{application.name}</td>
                <td className="px-4 py-2 border border-gray-200">{application.email}</td>
                <td className="px-4 py-2 border border-gray-200">{application.phone}</td>
                <td className="px-4 py-2 border border-gray-200">{application.address}</td>
                <td className="px-4 py-2 border border-gray-200">{application.status}</td>
                <td className="px-4 py-2 border border-gray-200">{application.paymentApproval}</td>
                <td className='px-4 py-3 border border-gray-200 '> 
                  <Button
                    onClick={() => deleteApplication(application._id)}
                    className="bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
