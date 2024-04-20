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
    <div className="heroSection bg-gradient-to-r from-slate-50 to-purple-400 via-slate-200 py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2">
          <div className="title mb-8">
            <h1 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Find a job that suits
            </h1>
            <h2 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {/* {text.join("")} */}
              your interests and skills
            </h2>
            <p className="text-gray-700 text-sm">
              We would like to extend our heartfelt appreciation to our esteemed advisors at Jimma University,
              Mr. Temesgen D. and Dr. Getachew M., for their unwavering guidance and invaluable insights.
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
        <div className="w-full lg:w-1/2">
        <img src="/product.jpg" alt="hero" className="object-cover w-full h-auto lg:h-full animate-pulse" />
      </div>

      </div>
    </div>
  );
};

export default HeroSection;
