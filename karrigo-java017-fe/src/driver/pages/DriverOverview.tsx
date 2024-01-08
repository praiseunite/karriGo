import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import DriverHeader from "../layout/header/DriverHeader";
import { AxiosError } from "axios";
import customFetch from "../../CustomFetch";
import PortalPopup from "../../layouts/Navbar/PortalPopup";
import Frame from "../components/Frame";

interface OrderDetails {
  orderId: number;
  receiver: string;
  dropOffLocation: string;
  sender: string;
  pickUpLocation: string;
  trackingNum: string;
  status: string;
  imageURL: string;
}

function DriverOverview() {
  const [selectedTab, setSelectedTab] = useState<null | string>(null);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [isViolet, setIsViolet] = useState(false);
  const [error, setError] = useState("");
  const [isFrameOpen, setFrameOpen] = useState(false);

  const [trackingNum, setTrackingNum] = useState("");
  const [status, setStatus] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLast, setLast] = useState(false);
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      pageOrders();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pageNo]);

  const pageOrders = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get("/drivers/orders?pageNo=" + pageNo + "&pageSize=" + pageSize)
        .then((res) => {
          const data = res.data.responseData;

          setPageNo(data.pageNo);
          setPageSize(data.pageSize);
          setLast(data.lastPage);
          setOrders(data.orderResponseList);
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  // const handleDivClick = (component: string) => {
  //   if (selectedComponent === component) {
  //     // If the clicked component is already selected, unselect it
  //     setSelectedComponent("");
  //   } else {
  //     // Otherwise, select the clicked component
  //     setSelectedComponent(component);

  //     // Update state variables based on the clicked component
  //     if (component.length > 5 ) {
  //       setIsViolet(true);
  //     }
  //   }
  // };

  // const getDivName = (component: string) => {
  //   // Add a class to the selected component to highlight it
  //   return `your-common-classes ${
  //     selectedComponent === component ? "selected" : ""
  //   }`;
  // };

  // const handleImageClick = (id: string) => {
  //   handleDivClick(id);
  //   // Additional logic for image click if needed
  // };

  const openFrame = useCallback(() => {
    setFrameOpen(true);
  }, []);

  const closeFrame = useCallback(() => {
    setFrameOpen(false);
  }, []);

  return (
    <>
      <DriverHeader current_tab={"Overview"} />
      <div className="bg-white flex flex-col items-center pl-9 pr-8 max-md:px-5">
        <div className="self-stretch mt-8 mb-96 max-md:max-w-full max-md:mb-10 max-w-full">
          <div className="gap-5 object-full flex max-md:flex-col max-md:items-stretch max-md:gap-0 grid grid-cols-3 gap-4">
            {orders &&
              orders.map((order) => (
                <div
                  key={order?.trackingNum}
                  // href="#"
                  // onClick={()=>handleImageClick(order?.trackingNum)}
                  role="your-role"
                  // className={getDivName(order?.trackingNum)}
                >
                  <div
                    className={`justify-center items-stretch border ${
                      isViolet
                        ? "border-violet-700 bg-violet-700"
                        : "border-[color:var(--Grey-200,#EAECF0)] bg-white"
                    } self-stretch flex flex-col mt-8 p-3 rounded-xl border-solid max-md:max-w-full`}
                  >
                    <div className="justify-between flex w-full gap-5 items-start">
                      <div className="items-stretch flex gap-2">
                        <div
                          className={`text-${
                            isViolet ? "white" : "black"
                          } text-base leading-6 tracking-normal text-sm`}
                        >
                          ID:
                        </div>
                        <div
                          className={`text-${
                            isViolet ? "white" : "black"
                          } text-base leading-6 tracking-normal text-sm`}
                        >
                          {order?.trackingNum}
                        </div>
                      </div>
                      <div className="items-center self-stretch flex justify-between gap-2">
                        <div className="items-center flex gap-2 my-auto">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cccc157-f902-4050-9949-470d4b7172cd?"
                            className="aspect-square object-contain object-center w-2.5 fill-green-500 overflow-hidden shrink-0 max-w-full my-auto"
                          />
                          <div className="text-green-500 text-sm leading-5 self-stretch grow whitespace-nowrap text-sm">
                            {order?.status}
                          </div>
                        </div>
                        <div onClick={openFrame} className="cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_54_3005)">
                              <path
                                d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                                fill="#323232"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_54_3005">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-[0.64] bg-black bg-opacity-20 shrink-0 h-0.5 mt-2.5" />
                    <div className="items-center flex justify-between gap-5 mt-3">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b0fb06d-e348-42a1-a8ab-3c21467c558e?"
                        className="aspect-[0.08] object-contain object-center w-2.5 items-center overflow-hidden shrink-0 max-w-full my-auto"
                      />
                      <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                        <div className="text-rose-500 text-xs font-medium leading-5 uppercase whitespace-nowrap">
                          SENDER
                        </div>
                        <div
                          className={`text-${
                            isViolet ? "white" : "black"
                          } text-base leading-6 tracking-normal`}
                        >
                          {order?.sender}
                        </div>
                        <div
                          className={`text-${
                            isViolet ? "white" : "black"
                          } text-base leading-6 tracking-normal`}
                        >
                          {order?.pickUpLocation}{" "}
                        </div>
                        <div className="text-green-500 text-xs font-medium leading-5 uppercase whitespace-nowrap mt-8">
                          RECEIVER
                        </div>
                        <div
                          className={`text-${
                            isViolet ? "white" : "black"
                          } text-base leading-6 tracking-normal`}
                        >
                          {order?.receiver}
                        </div>
                        <div
                          className={`text-${
                            isViolet ? "white" : "black"
                          } text-base leading-6 tracking-normal`}
                        >
                          {order?.dropOffLocation}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="opacity-[0.64] bg-black bg-opacity-20 shrink-0 h-0.5 mt-2.5" />
                    <div className="justify-between items-stretch flex w-full gap-5 mt-3">
                      <div className="items-stretch flex justify-between gap-3">
                        <img
                          loading="lazy"
                          src={
                            order?.imageURL ||
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/02487d23-1063-4dbe-b3bf-f05c18e2bcbf?"
                          }
                          alt="driver picture"
                          className="aspect-square object-contain object-center w-[50px] overflow-hidden shrink-0 max-w-full rounded-[50%]"
                        />
                        <div className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                          <div
                            className={`text-${
                              isViolet ? "white" : "black"
                            } text-base leading-6 tracking-normal`}
                          >
                            {order?.sender}
                          </div>
                          <div
                            className={`text-${
                              isViolet ? "white" : "black"
                            } text-base leading-6 tracking-normal`}
                          >
                            Client
                          </div>
                        </div>
                      </div>
                      <div className="items-center bg-violet-100 self-center flex aspect-[1.625] flex-col my-auto px-5 py-2 rounded-xl">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/121e160c-fe99-4468-8bd8-d8dd172e8efd?"
                          className="aspect-square object-contain object-center w-4 overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                  {isFrameOpen && (
                    <PortalPopup
                      overlayColor="rgba(113, 113, 113, 0.3)"
                      placement="Centered"
                      onOutsideClick={closeFrame}
                    >
                      <div onClick={closeFrame}>
                      <Frame taskId={order?.orderId}/>
                      </div>
                    </PortalPopup>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default DriverOverview;
