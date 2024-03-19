import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="how-it-works bg-gray-100 py-12">
      <div className="container mx-auto">
        <h3 className="text-3xl font-semibold text-center mb-8">How JobZee Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <FaUserPlus className="text-blue-500 text-5xl mb-4" />
            <p className="text-lg font-semibold mb-2">Create Account</p>
            <p className="text-sm text-gray-600 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.
            </p>
          </div>
          <div className="card bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <MdFindInPage className="text-blue-500 text-5xl mb-4" />
            <p className="text-lg font-semibold mb-2">Find a Job/Post a Job</p>
            <p className="text-sm text-gray-600 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.
            </p>
          </div>
          <div className="card bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <IoMdSend className="text-blue-500 text-5xl mb-4" />
            <p className="text-lg font-semibold mb-2">Apply For Job/Recruit Suitable Candidates</p>
            <p className="text-sm text-gray-600 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
