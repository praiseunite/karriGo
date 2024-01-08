import React from "react";
import { useNavigate } from "react-router-dom";

interface Props{
  current_tab: string;
}

const DriverOptions = ({current_tab}: Props) => {
  const navigate = useNavigate();

  const gotoOverview = () => {
    navigate("/driver/home");
  };

  const gotoHistory = () => {
    navigate("/driver/history")
  };

  const gotoFindTrack = () => {
    navigate("/driver/find_track")
  };

  return (
    <div className="items-stretch flex w-[316px] max-w-full justify-between gap-5 ml-8 mt-3 max-md:justify-center max-md:ml-2.5">
      <div
        className={`text-base leading-6 tracking-normal self-center my-auto px-5 py-1 ${
          current_tab === "Overview"
            ? "rounded-2xl bg-violet-700 text-white"
            : "text-gray-800 rounded-2xl opacity-[0.64] bg-black bg-opacity-20"
        }`}
        onClick={gotoOverview}
        style={{ cursor: "pointer" }}
      >
        Overview
      </div>
      <div
        className={`text-base leading-6 tracking-normal self-center whitespace-nowrap my-auto px-5 py-1 ${
          current_tab === "History"
            ? "rounded-2xl bg-violet-700 text-white"
            : "rounded-2xl opacity-[0.64] bg-black bg-opacity-20 text-gray-800 "
        }`}
        onClick={gotoHistory}
        style={{ cursor: "pointer" }}
      >
        History
      </div>
      <div
        className={`text-base leading-6 tracking-normal self-center whitespace-nowrap my-auto px-5 py-1 ${
          current_tab === "Find Track"
            ? "rounded-2xl bg-violet-700 text-white"
            : "rounded-2xl opacity-[0.64] bg-black bg-opacity-20 text-gray-800 "
        }`}
        onClick={gotoFindTrack}
        style={{ cursor: "pointer" }}
      >
        Find Track
      </div>
    </div>
  );
};

export default DriverOptions;
