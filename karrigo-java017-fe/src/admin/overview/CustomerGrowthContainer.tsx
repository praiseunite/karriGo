import React, { FunctionComponent, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const CustomerGrowthContainer: FunctionComponent = () => {
  const [isYearBoxOpen, setYearBoxOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [yearOptions, setYearOptions] = useState<number[]>([]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setYearBoxOpen(false);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2019 }, (_, index) => currentYear - index);
    setYearOptions(years);
  }, []);

  // Sample data for the line graph
  const chartOptions = {
    chart: {
      id: "customerGrowthChart",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  };

  const chartSeries = [
    {
      name: "Customer Growth",
      data: [50, 100, 150, 200, 250, 200, 150, 100, 50, 0, 50, 100],
    },
  ];

  return (
    <div className="relative top-[20px] left-[36px] rounded-2xl bg-white w-[857px] h-[520px] overflow-hidden text-left text-sm text-grey-400 font-body-text-normal-16">
      <b className="absolute top-[29px] left-[31px] text-5xl leading-[120%] text-grey-900">
        Customer Growth
      </b>



      {/* <div className="relative top-[22px] left-[670px] w-[150px] cursor-pointer rounded-md">
        <div
          className={`border-[2px] border-solid border-grey-2001 py-2 px-4 rounded-md ${
            isYearBoxOpen ? "rounded-t-md" : "rounded-md"
          }`}
          onClick={() => setYearBoxOpen(!isYearBoxOpen)}
        >
          {isYearBoxOpen ? (
            <div className="relative leading-[140%]">Close</div>
          ) : (
            <div className="relative leading-[120%]">
              {selectedYear || "Current"}
              <img className="relative w-7 h-3.5" alt="" src="/caretdown1.svg" />
            </div>
          )}
        </div>
        {isYearBoxOpen && (
          <div className="absolute top-[10%] left-2 mt-1 bg-white border-[5px] border-solid border-grey-21 rounded-md">
            <div
              className="py-2 px-4 cursor-pointer rounded-md-t"
              onClick={() => handleYearChange(new Date().getFullYear())}
            >
              Current Year
            </div>
            {yearOptions.map((yearOption) => (
              <div
                key={yearOption}
                className={`py-2 px-4 cursor-pointer ${
                  yearOption === selectedYear ? "bg-gray-200" : ""
                }`}
                onClick={() => handleYearChange(yearOption)}
              >
                {yearOption}
              </div>
            ))}
          </div>
        )}
      </div> */}


      <div className="absolute top-[150px] left-[30px] w-[800px] h-[370px]">
        <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={370} />
      </div>
    </div>
  );
};

export default CustomerGrowthContainer;
