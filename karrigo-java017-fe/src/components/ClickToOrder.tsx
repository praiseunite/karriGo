import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const ClickToOrder = () => {
  const navigate = useNavigate();
  const onFrameButton3Click = useCallback(() => {
    // Please sync "Place order" to the project
    navigate("/create_order");
  }, []);
  return (
    <div>
      <div className="absolute top-[100%] left-[36px] mt-5 rounded-xl bg-log-pri w-[869px] h-[217px] overflow-hidden text-center text-5xl text-white">
          <img
            className="absolute top-[0px] left-[48px] w-[200px] h-[200px] overflow-hidden"
            alt=""
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/414b1d21-cb22-444e-98f7-2e852e5241a1?"
          />
          <img
            className="absolute top-[49px] right-[0px] w-[150px] h-[150px] overflow-hidden"
            alt=""
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c18002b6-0fcc-4400-ab9d-6ad23210211c?"
          />
          <div className="absolute top-[52px] left-[287px] tracking-[-0.01em] leading-[24px] inline-block w-[411px]">
            <span className="font-medium">Select the most suitable{" "}</span>
            <b>delivery</b>
            <span className="font-medium"> option.</span>
          </div>
          <button
            className="cursor-pointer [border:none] py-2 px-[18px] bg-log-pri2 bg-white hover:bg-blue-200 absolute top-[125px] left-[408px] rounded flex flex-row items-center justify-center gap-[10px]"
            autoFocus={true}
            onClick={onFrameButton3Click}
          >
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e00fa10b-20ee-4674-9c24-65315269f406?"
            />
            <div className="relative text-base tracking-[-0.01em] leading-[24px] font-medium font-body-text-normal-16 text-log-pri text-center">
              Place an order
            </div>
          </button>
        </div>
    </div>
  )
}

export default ClickToOrder