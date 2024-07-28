import { useEffect, useState } from "react";
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiNewspaper,
  HiOutlinePaperAirplane,
  HiOutlineQuestionMarkCircle,
  HiOutlineUserGroup,
} from "react-icons/hi";

export default function DashboardComp() {
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJobSeekerUsers, setTotalJobSeekerUsers] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        const response = await fetch("https://local-labor-market-web-applications.onrender.com/api/v1/user/getjobseekers");
        const data = await response.json();
        if (data.success) {
          setTotalJobSeekerUsers(data.totalJobSeekerUsers);
        } else {
          console.error("Error fetching job seekers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      }
    };

    fetchJobSeekers();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://local-labor-market-web-applications.onrender.com/api/v1/user/getbemployee");
        const data = await response.json();
        if (data.success) {
          setTotalEmployees(data.totalEmployees);
        } else {
          console.error("Error fetching employees:", data.message);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://local-labor-market-web-applications.onrender.com/api/v1/user/getusers");
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          setTotalUsers(data.totalUsers);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

    
  useEffect(() => {
    const fetchTotalJobs = async () => {
      try {
        const response = await fetch("hhttps://local-labor-market-web-applications.onrender.com/api/v1/job/getall");
        const data = await response.json();
        if (data.success) {
          setTotalJobs(data.totalJobsCount);
        } else {
          console.error("Error fetching total jobs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching total jobs:", error);
      }
    };

    fetchTotalJobs();
  }, []);


  useEffect(() => {
    const fetchTotalApplications = async () => {
      try {
        const response = await fetch("https://local-labor-market-web-applications.onrender.com/api/v1/application/applications");
        if (!response.ok) {
          throw new Error("Failed to fetch total applications");
        }
        const data = await response.json();
        setTotalApplications(data.count);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTotalApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className="p-8 md:mx-auto   translate-x-5  ">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3  gap-4 rounded-md ">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Takers</h3>
              <p className="text-2xl">{totalEmployees}</p>
            </div>
            <HiOutlineQuestionMarkCircle className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Task Provider</h3>
              <p className="text-2xl">{totalJobSeekerUsers}</p>
            </div>
            <HiOutlinePaperAirplane className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Applications</h3>
              <p className="text-2xl">{totalApplications}</p>
            </div>
            <HiNewspaper className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
