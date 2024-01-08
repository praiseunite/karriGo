import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { AxiosError } from "axios";
import customFetch from "../CustomFetch";
import { format } from "date-fns";
import { MdDoneAll } from "react-icons/md";

interface TrackingLocationResponse {
  locationId: number;
  location: string;
  dateTime: string;
}

interface TaskHistory {
  orderId: number;
  senderName: string;
  receiverName: string;
  receiverPhone: string;
  trackingNum: string;
  orderStatus: string;
  itemName: string;
  itemCategory: string;
  pickUpLocation: string;
  dropOffLocation: string;
  deliveryPrice: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNum: string;
  address: string;
  imageURL: string;
  locationList: TrackingLocationResponse[];
}

function AdminDeliveries() {
  const [error, setError] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [isLast, setLast] = useState(false);
  const [tasks, setTasks] = useState<TaskHistory[] | null>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    getOrderHistory();
  }, [pageNo]);

  const getOrderHistory = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get("/admins/deliveries?pageNo=" + pageNo + "&pageSize=" + pageSize)
        .then((res) => {
          const data = res.data.responseData;

          setPageNo(data.pageNo);
          setPageSize(data.pageSize);
          setLast(data.lastPage);
          setTasks(data.aboutOrderList);

          console.log(data);
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const gotoNextPage = () => {
    setPageNo(isLast ? pageNo : pageNo + 1);
  };

  const gotoPreviousPage = () => {
    setPageNo(pageNo <= 0 ? 0 : pageNo - 1);
  };

  return (
    <>
      <AdminHeader current_tab={"Deliveries"} />
      <div className="bg-white flex flex-col items-center pl-9 pr-8 max-md:px-5 overflow-y-auto h-screen">
        <div className="self-stretch mt-8 mb-10 max-md:max-w-full max-md:mb-10 max-w-full">
          <div className="gap-5 object-full flex max-md:flex-col max-md:items-stretch max-md:gap-0 grid grid-cols-3 gap-4">
            {tasks &&
              tasks.map((task) => (
                <div
                  key={task?.orderId}
                  onClick={() => {
                    setActive(task?.orderId);
                  }}
                  className="flex flex-col items-stretch"
                >
                  <div
                    className={`justify-center items-stretch border ${
                      active === task?.orderId
                        ? "border-violet-700 bg-violet-700"
                        : "border-[color:var(--Grey-200,#EAECF0)] bg-white"
                    } self-stretch flex flex-col mt-8 p-3 rounded-xl border-solid max-md:max-w-full`}
                  >
                    <div className="justify-between items-stretch flex w-full gap-5">
                      <div className="justify-between items-stretch flex gap-5">
                        <div className=" text-base leading-6 tracking-normal">
                          ID:
                        </div>
                        <div className="text-sm text-base leading-6 tracking-normal">
                          {task?.trackingNum}
                        </div>
                      </div>
                      <div className="items-center flex gap-2 self-start">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3484839f-bd79-476b-b794-0f317c010116?"
                          className="aspect-square object-contain object-center w-2.5 fill-green-500 overflow-hidden shrink-0 max-w-full my-auto"
                        />
                        <div className="text-green-500 text-sm leading-5 self-stretch grow whitespace-nowrap">
                          {task?.orderStatus}
                        </div>
                      </div>
                    </div>
                    <div className="opacity-[0.64] bg-black bg-opacity-20 shrink-0 h-0.5 mt-2.5" />
                    <div className="h-[12rem] overflow-y-auto">
                      {task?.locationList &&
                        task.locationList.map((lacate) => (
                          <div
                            key={lacate?.locationId}
                            className="items-center flex justify-between gap-4 mt-3"
                          >
                            <MdDoneAll />
                            <div className="items-stretch self-stretch flex grow basis-[0%]">
                              <div className="items-center flex justify-between gap-3">
                                <div
                                  className={`text-${
                                    active === task?.orderId ? "white" : "black"
                                  } text-base leading-6 tracking-normal`}
                                >
                                  {format(
                                    new Date(lacate?.dateTime),
                                    "EEE,MMM do, yyyy hh:mm a"
                                  )}
                                </div>
                                <div className="justify-center items-stretch self-stretch flex grow basis-[0%] flex-col">
                                  <div
                                    className={`text-${
                                      active === task?.orderId
                                        ? "white"
                                        : "black"
                                    } text-base leading-6 tracking-normal `}
                                  >
                                    {" "}
                                    {lacate?.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="opacity-[0.64] bg-black bg-opacity-20 shrink-0 h-0.5 mt-2.5" />
                    <div className="justify-between items-stretch flex w-full gap-5 mt-3">
                      <div className="items-center flex justify-between gap-3">
                        <img
                          loading="lazy"
                          src={
                            task?.imageURL ||
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/02487d23-1063-4dbe-b3bf-f05c18e2bcbf?"
                          }
                          className="aspect-square object-contain object-center w-10 overflow-hidden shrink-0 max-w-full my-auto rounded-[50%]"
                        />
                        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                          <div className="text-base leading-6 tracking-normal">
                            {task?.senderName}
                          </div>
                          <div className=" text-base leading-6 tracking-normal">
                            Client
                          </div>
                        </div>
                      </div>
                      <a
                        // href="#"
                        // onClick={() => handleClick("")}
                        // role="button"
                        // tabIndex={0}
                        className="items-center bg-violet-100 self-center flex aspect-[1.625] flex-col my-auto px-5 py-2 rounded-xl"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/76e33e16-bf68-456a-b919-d967be10290b?"
                          className="aspect-square object-contain object-center w-4 overflow-hidden"
                          alt="Clickable Image"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-row ">
            <button
              type="button"
              className={`text-white text-l ${
                pageNo <= 0
                  ? "bg-violet-200"
                  : "bg-violet-500 hover:bg-violet-700"
              } mt-8 mr-[69rem] font-semibold leading-5 whitespace-nowrap justify-center items-center
              px-5 py-3 rounded-3xl max-md:max-w-full `}
              onClick={gotoPreviousPage}
            >
              Previous Page
            </button>
            <button
              type="button"
              className={`text-white text-l ${
                isLast ? "bg-violet-200" : "bg-violet-500 hover:bg-violet-700"
              } mt-8 font-semibold leading-5 whitespace-nowrap justify-center items-center
              px-5 py-3 rounded-3xl max-md:max-w-full `}
              onClick={gotoNextPage}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDeliveries;
