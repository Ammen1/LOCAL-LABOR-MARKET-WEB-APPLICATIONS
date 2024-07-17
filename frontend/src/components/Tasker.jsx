import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import axios from 'axios';
import { Button, Card, TextInput } from 'flowbite-react';
import { MdEmail, MdPhone, MdLocationOn, MdSchool } from 'react-icons/md'; 
import { FaStar } from 'react-icons/fa';

export default function Tasker() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState({});
  const [showFullCoverLetter, setShowFullCoverLetter] = useState(false);

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

  const fetchReviewsByJobSeekerIds = async (jobSeekerId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/user/reviews/${jobSeekerId}`);
      return response.data;
    } catch(error) {
      console.log("Error fetching reviews by job Seeker Ids:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const toggleCoverLetterVisibility = () => {
    setShowFullCoverLetter(!showFullCoverLetter);
  };
  const handleSendEmail = async (userId) => {
    try {
      const subject = prompt('Enter the subject of the job offer:');
      const message = prompt('Enter the message for the job offer:');

      await axios.post("http://localhost:4000/api/v1/user/create-and-send-job-offer", {
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
  
  const filterUser = (user) => {
    const { name, email, skills, location } = user;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      user.role === 'Job Seeker' &&
      (
        name.toLowerCase().includes(lowerCaseQuery) ||
        email.toLowerCase().includes(lowerCaseQuery) ||
        skills.join(' ').toLowerCase().includes(lowerCaseQuery) ||
        location.toLowerCase().includes(lowerCaseQuery)
      )
    );
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const userReviews = {};
      for (const user of users) {
        const reviews = await fetchReviewsByJobSeekerIds(user._id);
        userReviews[user._id] = reviews;
      }
      setReviews(userReviews);
    };
    fetchReviews();
  }, [users]);

  return (
    <div className="px-4 py-8 bg-gradient-to-b  from-slate-100 to-purple-400 via-slate-300">
      <div className="relative w-full justify-center mb-4 mt-20">
        <div size="2xl" className="text-center text-3xl mb-6 lg:mr-20 font-bold">Notif Your Next Tasker</div>
        <input
          type="text"
          placeholder="Search by name, email, skills, or location"
          className="pl-10 pr-4 py-2  text-black rounded-md w-96 lg:ml-96  bg-gradient-to-bl from-slate-100 to-purple-400 via-slate-300"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {users
          .filter(filterUser)
          .map((user, index) => (
            <Card key={index} className="container w-full mt-20 h-full max-w-sm mx-4 my-4  bg-gradient-to-tr from-slate-100 to-purple-400 via-slate-300">
              <div className="w-full h-44 overflow-hidden self-center  rounded-t-lg">
                {user.resume && user.resume.url && (
                  <img src={user.resume.url} alt="Resume" className="h-44 ml-20 object-cover rounded-full" />
                )}              
              </div>
              <h2 className="text-2xl text-black font-semibold">{user.name}</h2>
              <div className="flex items-center text-sm mb-2 gap-2">
                <MdEmail className="text-gray-950 mr-2 text-mb" />
                <span className=" text-black text-md">{user.email}</span>
                <MdPhone className="text-gray-900 mr-2 text-md" /><span className="text-gray-900">{user.phone}</span>
              </div>              
              <div className="">
                <h6 className="text-black mb-2">Hi my name is {user.name} {user.headline}</h6>
                <h6 className="text-black mb-2">I have {user.experience}<br />I have all this skills {user.skills.join(', ')} </h6>
                <div className="flex items-center ">
                  <MdLocationOn className="text-black mr-2 text-xl" />
                  <p className="text-black text-sm">{user.location}</p>
                </div>
                {/* <div className="flex items-center ">
                  <MdSchool className="text-black mr-2 text-xl" />
                  <p className="text-black text-sm">{user.education}</p>
                </div> */}
                
                <h1 className="text-black mt-5">Reviews Count: {reviews[user._id] ? reviews[user._id].length : 0}</h1>
                {reviews[user._id] && reviews[user._id].map((review, index) => (
                    <div key={index}>
                        <div className="mt-2">
                          <div className="text-sm ">
                          <div className="flex items-start">
                          <strong>Tasker Provider name:</strong>{" "}
                          <span className="mr-1">{review.employerID.user.name}</span>
                        </div>
                            <div className="overflow-hidden">
                              {review.comment.length <= 500 ? review.comment : `${review.comment.slice(0, 500)}...`}
                            </div>
                            {review.comment.length > 400 && (
                              <button onClick={toggleCoverLetterVisibility} className="text-blue-500 hover:underline mt-2">
                                Read More
                              </button>
                            )}
                            <div className="flex items-center mb-2">
                              {[...Array(review.rating)].map((_, index) => (
                                <FaStar key={index} className="text-yellow-500 mr-1" /> 
                              ))}
                            </div>
                          </div>
                        </div>
                      
                    </div>
                    
                  ))}
                 <div className="flex justify-center mt-4">
                  <Button onClick={() => handleSendEmail(user._id)} className="bg-gradient-to-br from-indigo-500 to-pink-500 via-indigo-600 px-4 py-2 rounded">
                    Send Job Offer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
