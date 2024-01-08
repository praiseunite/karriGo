import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { AxiosError } from "axios";
import customFetch from "../CustomFetch";

interface DriverDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  pictureUrl: string;
  availableStatus: string;
  activeStatus: string;
}

function AdminDriver() {
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  const [error, setError] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [isLast, setLast] = useState(false);
  const [drivers, setDrivers] = useState<DriverDetails[]>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    getOrderHistory();
  }, []);

  const getOrderHistory = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get(
          "/admins/drivers_page?role=DRIVER&pageNo=" +
            pageNo +
            "&pageSize=" +
            pageSize
        )
        .then((res) => {
          const data = res.data.responseData;

          setPageNo(data.pageNo);
          setPageSize(data.pageSize);
          setLast(data.last);
          setDrivers(data.content);

          console.log(data);
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const handleIconClick = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  const handleFlagClick = async (driverId: number) => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .post("/admins/driver_record_status/" + driverId)
        .then((res) => {
          const data = res.data.responseMessage;

          console.log(data);
        });
        setPopUpVisible(false)
        getOrderHistory();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  // const handleDeleteClick = async (driverId: number) => {
  //   try {
  //     const response = await customFetch(localStorage.getItem("accessToken"))
  //       .delete("/admins/driver_remove/" + driverId)
  //       .then((res) => {
  //         const data = res.data.responseMessage;

  //         console.log(data);
  //         getOrderHistory();
  //       });
  //       setPopUpVisible(false);
        
  //   } catch (err) {
  //     if (err && err instanceof AxiosError)
  //       setError(err.response?.data.responseMessage);
  //     else if (err && err instanceof Error) setError(err.message);

  //     console.log("Error: ", err);
  //   }
  // };

  return (
    <>
      <AdminHeader current_tab={"Drivers"} />
      <div 
      // onClick={()=> setPopUpVisible(false)}
      className="flex flex-col items-center pl-9 pr-8 max-md:px-5 ">
        <div className="self-stretch mt-8 mb-10 max-md:max-w-full max-md:mb-10 max-w-full">
          <div className="gap-5 object-full flex max-md:flex-col max-md:items-stretch max-md:gap-0 grid grid-cols-3 gap-4">
            {drivers &&
              drivers.map((driver) => (
                <div
                  key={driver?.id}
                  onClick={() => {
                    setActive(driver?.id);
                  }}
                  className="flex flex-col items-stretch  w-[33%] h-[25%] max-md:w-full max-md:ml-0"
                >
                  <div className="border border-[color:var(--grey-200,#EAECF0)] relative flex grow flex-col mx-auto px-3 py-3 rounded-xl border-solid">
                    {isPopUpVisible && active === driver?.id && (
                      <div className="left-25 mt-12  absolute z-40 top-0 right-2 rounded border h-[3rem] w-[6rem] border-solid bg-white">
                        <div
                          className=" flex gap-2 py-2 border-b-2"
                          onClick={()=>handleFlagClick(driver?.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <button>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/24711d92-68bf-46c7-85e4-db6a74cbb537?apiKey=60a62d801c914c1da2fccd5d795e8655&"
                            />
                          </button>

                          <div>Flag</div>
                        </div>

                        {/* <div
                          className="flex gap-2 mt-3 mb-2"
                          style={{ cursor: "pointer" }}
                          onClick={()=>handleDeleteClick(driver?.id)}
                        >
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba4367e1-5e2f-4ed3-a8d1-42323f780d6f?apiKey=60a62d801c914c1da2fccd5d795e8655&"
                          />

                          <div className="text-rose-500">Delete</div>
                        </div> */}
                      </div>
                    )}

                    <div className="justify-between  self-stretch flex w-full gap-5 items-start">
                      <div className="items-stretch  flex gap-4">
                        <div className="text-black  text-right text-base leading-6 tracking-normal">
                          Driver ID:
                        </div>

                        <div className="text-black text-right text-size font-med leading-6 tracking-normal whitespace-nowrap">
                          DR{driver?.id}
                        </div>
                        <div className={`text-black text-right text-size font-med ${driver?.activeStatus !== "ACTIVE" ? "text-red" : ""} leading-6 tracking-normal whitespace-nowrap`}>
                          {driver?.activeStatus === "ACTIVE" ? driver?.availableStatus : "FLAGGED"}
                        </div>
                      </div>

                      <div className="items-center self-stretch flex justify-between gap-2">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/104de622-8aa4-47f6-be2f-23b7e0975d61?apiKey=60a62d801c914c1da2fccd5d795e8655&"
                          className="aspect-square object-contain object-center w-6 overflow-hidden self-stretch shrink-0 max-w-full"
                          onClick={handleIconClick}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>

                    <div className="opacity-[0.64]  bg-black bg-opacity-20 self-stretch shrink-0 h-0.5 mt-2.5" />

                    <div className="justify-between items-stretch flex w-[348px] max-w-full gap-5 mt-4 self-start max-md:ml-2.5">
                      <div className="items-stretch flex grow basis-[0%] flex-col">
                        <div className="text-white-500 text-sm leading-5 tracking-normal uppercase whitespace-nowrap">
                          First Name:
                        </div>

                        <div className="text-black-500 text-base font-semibold leading-6 tracking-normal whitespace-nowrap mt-2.5">
                          {driver?.firstName}
                        </div>

                        <div className="text-white-500 text-sm leading-5 tracking-normal uppercase whitespace-nowrap mt-3">
                          gender
                        </div>

                        <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-wrap mt-2.5">
                          {driver?.gender}
                        </div>

                        <div className="text-white-500 text-sm leading-5 tracking-normal uppercase whitespace-nowrap mt-3">
                          License Number:
                        </div>

                        <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap mt-2.5">
                          ----
                        </div>
                      </div>

                      <div className="items-stretch relative flex grow basis-[0%] pr-0 flex-col">
                        <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase whitespace-nowrap">
                          Last Name:
                        </div>

                        <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap mt-2.5">
                          {driver?.lastName}
                        </div>

                        <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase whitespace-nowrap mt-3">
                          Phone number:
                        </div>

                        <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap mt-2.5">
                          {driver?.phoneNumber}
                        </div>

                        <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase whitespace-nowrap mt-3">
                          Expiry Date:
                        </div>

                        <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap mt-2.5">
                          ----
                        </div>
                      </div>
                    </div>

                    <div className="opacity-[0.64] bg-black bg-opacity-20 self-stretch shrink-0 h-0.5 mt-2.5" />

                    <div className="justify-between items-stretch self-stretch flex w-full gap-5 mt-3">
                      <div className="items-stretch flex justify-between gap-3">
                        <img
                          loading="lazy"
                          src={
                            driver?.pictureUrl ||
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/02487d23-1063-4dbe-b3bf-f05c18e2bcbf?"
                          }
                          className="aspect-square object-contain object-center w-10 overflow-hidden shrink-0 max-w-full rounded-[50%]"
                        />
                        <div className="text-black text-right text-base font-semibold leading-6 tracking-normal self-center grow whitespace-nowrap my-auto">
                          {driver?.firstName} {driver?.lastName}
                        </div>
                      </div>
                      <div className="items-center bg-violet-100 self-center flex aspect-[1.625] flex-col my-auto px-5 py-2 rounded-xl">
                        <button style={{ cursor: "pointer" }}>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/54ae8eb3-26c9-4f64-8ac9-f47efbe84379?apiKey=60a62d801c914c1da2fccd5d795e8655&"
                            className="aspect-square object-contain object-center w-4 overflow-hidden"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDriver;
