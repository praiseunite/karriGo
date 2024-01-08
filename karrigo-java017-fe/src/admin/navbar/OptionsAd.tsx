import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  current_tab: string;
}

const OptionsAd = ({ current_tab }: Props) => {
  const [selectedItem, setSelectedItem] = useState("Overview");
  const navigate = useNavigate();

  const gotoOverview = () => {
    navigate("/admin/overview");
    setSelectedItem("Overview");
  };

  const gotoDeliveries = () => {
    navigate("/admin/deliveries");
    setSelectedItem("Deliveries");
  };

  const gotoDrivers = () => {
    navigate("/admin/drivers");
    setSelectedItem("Drivers");
  };

  return (
    <div className="items-stretch flex w-[316px] max-w-full justify-between gap-5 ml-8 mt-3 max-md:justify-center max-md:ml-2.5">
      <div
        className={`text-gray-800 text-base leading-6 tracking-normal self-center my-auto px-5 py-1 ${
          current_tab === "Overview"
            ? "rounded-2xl bg-violet-400"
            : "rounded-2xl opacity-[0.64] bg-black bg-opacity-20"
        }`}
        onClick={gotoOverview}
        style={{ cursor: "pointer" }}
      >
        Overview
      </div>
      <div
        className={`text-gray-800 text-base leading-6 tracking-normal self-center whitespace-nowrap my-auto px-5 py-1 ${
            current_tab === "Deliveries"
            ? "rounded-2xl bg-violet-400"
            : "rounded-2xl opacity-[0.64] bg-black bg-opacity-20"
        }`}
        onClick={gotoDeliveries}
        style={{ cursor: "pointer" }}
      >
        Deliveries
      </div>
      <div
        className={`text-gray-800 text-base leading-6 tracking-normal self-center whitespace-nowrap my-auto px-5 py-1 ${
            current_tab === "Drivers"
            ? "rounded-2xl bg-violet-400"
            : "rounded-2xl opacity-[0.64] bg-black bg-opacity-20"
        }`}
        onClick={gotoDrivers}
        style={{ cursor: "pointer" }}
      >
        Drivers
      </div>
    </div>
  );
};

export default OptionsAd;
