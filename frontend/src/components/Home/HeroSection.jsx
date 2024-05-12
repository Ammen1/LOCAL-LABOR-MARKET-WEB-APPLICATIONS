import React, { useState, useEffect } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import heroAnimation from '../../assets/animation/Animation 4.json';
import Lottie from "lottie-react";

const HeroSection = () => {
  const [text, setText] = useState([]);
  const phrase = "your interests and skills";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < phrase.length) {
        setText((prevText) => [...prevText, phrase[index]]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=" bg-gradient-to-t from-slate-50 to-purple-700 via-slate-300 py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2">
          <div className="title mb-8">
            <h1 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Find a job that suits
            </h1>
            <h2 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              
              your interests and skills
            </h2>
            <p className="text-gray-700 text-sm">
            The Local Labor Market Platform Development project responds to the dynamic needs of the gig 
            economy by connecting experienced local workers in Jimma City with those seeking services
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-primary">
              <FaBuilding className="mr-2" /> Companies
            </button>
            <button className="btn btn-primary">
              <FaSuitcase className="mr-2" /> Jobs
            </button>
            <button className="btn btn-primary">
              <FaUsers className="mr-2" /> Teams
            </button>
            <button className="btn btn-primary">
              <FaUserPlus className="mr-2" /> Candidates
            </button>
          </div>
        </div>
        <div className="w-full ml-28 lg:w-1/2">
        <Lottie
        animationData={heroAnimation}
        loop
        autoplay
        style={{ width: '100%', height: "80%", maxWidth: '500px' }}
        className="bg-cover rounded-lg"
      />
      </div>

      </div>
    </div>
  );
};

export default HeroSection;
