
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <div className="companies bg-gray-100 py-8">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-6">TOP COMPANIES</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="mr-4 text-blue-500 text-4xl">{company.icon}</div>
                <div>
                  <p className="text-lg font-semibold">{company.title}</p>
                  <p className="text-sm text-gray-600">{company.location}</p>
                </div>
              </div>
              <div className="bg-gray-200 p-4 flex justify-between">
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
                  Open Positions {company.openPositions}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
