import React, { useState, useEffect } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

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
    <div className="heroSection bg-slate-50 py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2">
          <div className="title mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Find a job that suits
            </h1>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              {text.join("")}
            </h1>
            <p className="text-gray-700 text-lg">
            We would like to extend our heartfelt appreciation to our esteemed advisors at Jimma University 
            Mr. Temesgen D. and Dr. Getachew M. for their unwavering guidance, invaluable insights, and 
            
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
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <img src="/product.png" alt="hero" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
