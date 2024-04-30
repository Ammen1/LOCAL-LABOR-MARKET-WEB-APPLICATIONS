import React, { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import MyApplications from './Application/MyApplications';
import { MdEmail, MdPhone, MdLocationOn, MdSchool } from 'react-icons/md'; 


export default function Tasker() {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user/getuserss');
        const { data } = response;
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  const handleSendEmail = async (userId) => {
    try {
      const subject = prompt('Enter the subject of the job offer:');
      const message = prompt('Enter the message for the job offer:');

      await axios.post("http://localhost:4000/api/v1/user//create-and-send-job-offer", {
        userId,
        subject,
        message,
      });

      alert('Job offer sent successfully!');
    } catch (error) {
      console.error('Error sending job offer:', error);
      alert('Failed to send job offer. Please try again later.');
    }
  };
  return (
    <div className="flex flex-wrap justify-center mt-20">
      {users.filter(user => user.role === 'Job Seeker').reduce((rows, user, index) => {
        if (index % 2 === 0) rows.push([]);
        rows[rows.length - 1].push(
          <div key={index} className="max-w-sm mx-4 my-4 rounded-lg shadow-lg h-full ">
            <div className="w-full h-44 overflow-hidden self-center  rounded-t-lg">
              {user.resume && user.resume.url && (
                <img src={user.resume.url} alt="Resume" className="h-44 ml-20 object-cover rounded-full " />
              )}              
            </div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <div className="p-1">
            <h6 className="text-gray-500 mb-2">Hi my name is {user.name} {user.headline}</h6>
            <h6 className="text-gray-500 mb-2">and i have {user.experience} i have all this skills {user.skills.join(', ')} </h6>
            <div className="flex items-center mb-2">
                <MdEmail className="text-gray-500 mr-2" />
                <p className="text-gray-500">{user.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdPhone className="text-gray-500 mr-2" />
                <p className="text-gray-500">{user.phone}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdLocationOn className="text-gray-500 mr-2" />
                <p className="text-gray-500 text-sm">{user.location}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdSchool className="text-gray-500 mr-2" />
                <p className="text-gray-500 text-sm">{user.education}</p>
              </div>
            
              <h1 className="text-gray-500 mb-2">Reviews Count: {user.reviews.length}</h1>

              <div className="flex justify-center mt-4">
              <Button onClick={() => handleSendEmail(user._id)} className="bg-gradient-to-br from-indigo-500 to-pink-500 via-indigo-600 px-4 py-2 rounded">
                Send Job Offer
              </Button>
            </div>

            </div>
          </div>
        );
        return rows;
      }, []).map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row}
        </div>
      ))}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleDeleteUser(deleteUserId)}>Delete</Button>
                <Button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
