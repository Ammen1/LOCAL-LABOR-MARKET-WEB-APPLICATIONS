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

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/user/delete/${id}`);
      setUsers(users.filter(user => user._id !== id));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {users.filter(user => user.role === 'Job Seeker').reduce((rows, user, index) => {
        if (index % 2 === 0) rows.push([]);
        rows[rows.length - 1].push(
          <Card key={index} className="max-w-sm mx-4 my-4 rounded-lg shadow-lg">
            <div className="w-full h-48 overflow-hidden self-center  rounded-t-lg">
              {user.resume && user.resume.url && (
                <img src={user.resume.url} alt="Resume" className="h-44 ml-20  object-cover rounded-full  justify-center items-center" />
              )}
              
            </div>
            <h2 className="text-xl font-semibold mb-2 bg-gradient-to-tl  from-slate-100 to-purple-100 via-slate-100">{user.name}</h2>
            <div className="p-1">
            <h6 className="text-gray-500 mb-2">Hi my name is {user.name} {user.headline}</h6>
            <h6 className="text-gray-500 mb-2">and i have experience {user.experience} i have all this skills {user.skills.join(', ')} </h6>
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
                <p className="text-gray-500">{user.location}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdSchool className="text-gray-500 mr-2" />
                <p className="text-gray-500">{user.education}</p>
              </div>
            
              <h1 className="text-gray-500 mb-2">Reviews Count: {user.reviews.length}</h1>
              <div className="flex justify-center mt-4">
                <Button onClick={() => {
                  setDeleteUserId(user._id);
                  setShowConfirmModal(true);
                }} className="bg-gradient-to-br from-indigo-500 to-pink-500 via-indigo-600 px-4 py-2 rounded">
                  Send me Email
                </Button>
              </div>
            </div>
          </Card>
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
