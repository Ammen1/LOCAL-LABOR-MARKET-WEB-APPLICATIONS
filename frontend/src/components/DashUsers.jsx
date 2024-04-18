import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { Button } from "flowbite-react";

export default function DashUsers() {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuserss");
        const { data } = response;
        console.log("Fetched users data:", data);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  
  useEffect(() => {
    console.log("First user:", users[0]); // Log the first user object to check its structure
  }, [users]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/user/delete/${id}`);
      setUsers(users.filter(user => user._id !== id));
      setShowConfirmModal(false); // Close the modal after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <table className="shadow-md mt-10 w-full divide-y divide-gray-200 ml-44">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index} className="font-medium text-zinc-900 hover:underline cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button onClick={() => {
                  setDeleteUserId(user._id);
                  setShowConfirmModal(true);
                }} className="font-medium text-red-500 hover:underline cursor-pointer">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => deleteUser(deleteUserId)}>Delete</Button>
                <Button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
