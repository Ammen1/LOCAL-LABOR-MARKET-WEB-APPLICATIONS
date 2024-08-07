import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { Button } from "flowbite-react";

export default function DashUsers() {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://local-labor-market-web-applications.onrender.com/api/v1/user/getuserss");
        const { data } = response;
        console.log("Fetched users data:", data);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://local-labor-market-web-applications.onrender.com/api/v1/user/delete/${id}`);
      setUsers(users.filter(user => user._id !== id));
      setShowConfirmModal(false); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof user.phone === 'string' && user.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex w-full mt-10 justify-start ml-20">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, phone, or role"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <table className="shadow-md mt-6 w-full divide-y bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300 ml-20">
        <thead className="bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300 hover:from-teal-600">
          <tr className=" hover:from-teal-600">
            <th scope="col" className="">
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
        <tbody className="bg-white divide-y divide-gray-200 hover:from-teal-600">
          {filteredUsers.map((user, index) => (
            <tr key={index} className="font-medium text-zinc-900 hover:from-teal-500 cursor-pointer">
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
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300 hover:from-teal-600">
          <div className="bg-gradient-to-br from-slate-100 to-purple-400 via-slate-300 hover:from-teal-600 rounded-lg p-8 max-w-md w-full">
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
