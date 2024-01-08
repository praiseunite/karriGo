import React, { FunctionComponent, useState, useEffect, useRef } from "react";

type CustomerContainerType = {
  type: "Driver" | "Customer";
  numericValue?: string;
  percentageValue?: string;
  dataCount?: string;
};

const CustomerContainer: FunctionComponent<CustomerContainerType> = ({
  type,
  numericValue,
  percentageValue,
  dataCount,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsClicked(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleContainerClick = () => {
    setIsClicked(!isClicked);
  };

  const handleContainerHover = (hovered: boolean) => {
    if (!isClicked) {
      // Apply gray hover effect only if not clicked
      const className = `relative rounded-2xl bg-white w-[356px] h-[164px] overflow-hidden shrink-0 text-left text-base text-grey-5001 font-body-text-normal-16 md:flex md:flex-1 md:self-stretch md:h-auto cursor-pointer transition duration-300 ${
        hovered ? "hover:bg-gray-300" : ""
      }`;
      return className;
    } else {
      // Apply purple background if clicked
      return "relative rounded-2xl bg-purple-500 w-[356px] h-[164px] overflow-hidden shrink-0 text-left text-base text-grey-5001 font-body-text-normal-16 md:flex md:flex-1 md:self-stretch md:h-auto cursor-pointer transition duration-300";
    }
  };
  

  return (
    <div
      ref={containerRef}
      className={handleContainerHover(false)}
      onClick={handleContainerClick}
      onMouseEnter={() => handleContainerHover(true)}
      onMouseLeave={() => handleContainerHover(false)}
    >
      

      <div className=" ">
        <div className="flex flex-row items-center justify-start">
          <b className="relative tracking-[-0.05em] leading-[100%]">
            {numericValue}
          </b>
        </div>
        <div className="flex flex-row items-center justify-start gap-[2px] text-base text-green-500">
          <div className="relative leading-[140%]">{percentageValue}</div>
          <img className="relative w-3.5 h-3.5" alt="" src="/arrowright1.svg" />
        </div>
      </div>
      <div className="absolute top-[24px] left-[27px] flex flex-row items-start justify-start gap-[8px] text-xl">
        <img className="relative w-6 h-6" alt="" src="/users1.svg" />
        <div className="relative leading-[120%] font-medium">{dataCount}</div>
      </div>
      <div className="absolute top-[48px] left-[211px] w-[118px] h-[90.5px]">
        <div className="absolute top-[0px] left-[0px] rounded-t-[8.08px] rounded-b-none bg-log-pri w-[11px] h-[91px]" />
        <div className="absolute top-[27px] left-[21px] rounded-t-[8.08px] rounded-b-none bg-lavender w-3 h-16" />
        <div className="absolute top-[17px] left-[43px] rounded-t-[8.08px] rounded-b-none bg-lavender w-[11px] h-[74px]" />
        <div className="absolute top-[63px] left-[64px] rounded-t-[8.08px] rounded-b-none bg-log-pri w-[11px] h-7" />
        <div className="absolute top-[42px] left-[85px] rounded-t-[8.08px] rounded-b-none bg-log-pri w-3 h-[49px]" />
        <div className="absolute top-[6px] left-[107px] rounded-t-[8.08px] rounded-b-none bg-lavender w-[11px] h-[85px]" />
      </div>
    </div>
  );
};

export default CustomerContainer;
