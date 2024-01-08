import React, { useState, useEffect, useRef } from "react";
import DriverHeader from "../layout/header/DriverHeader";
import { AxiosError } from "axios";
import customFetch from "../../CustomFetch";
import PortalPopup from "../../layouts/Navbar/PortalPopup";
import { ErrorText } from "../../commons";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { MdDoneAll } from "react-icons/md";
import { format } from "date-fns";

const googleMapsApiKey: string = process.env
  .REACT_APP_GOOGLE_MAPS_API_KEY as string;

const libraries: any = ["drawing", "places"];

const center = { lat: 6.6378, lng: 5.92915 };
const embedUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBWAY9ncGFN8U3L2LrqB5u126Gh2k9FqKk&center=${center.lat},${center.lng}&zoom=10`;

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

function DriverHistory() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  const [error, setError] = useState("");
  const [locationError, setLocationError] = useState("");

  const [selectedTab, setSelectedTab] = useState<null | string>(null);
  const [orderDetailsClicked, setOrderDetailsClicked] = useState(false);
  const [customerInfoClicked, setCustomerInfoClicked] = useState(false);
  const [senderAddress, setSenderAddress] = useState("");
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [dropOff, setDropOffLoc] = useState("");
  const [current_location, setCurrentLoc] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [trackingNum, setTrackingNum] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [locationChange, setChange] = useState("");

  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLast, setLast] = useState(false);
  const [tasks, setTasks] = useState<TaskHistory[] | null>();
  const locationRef = useRef<HTMLInputElement>(null);
  const [locationOpen, setLocationOpen] = useState(0);
  const [active, setActive] = useState(0);

  const directionUrl = `https://www.google.com/maps/embed/v1/directions?key=${googleMapsApiKey}
  &origin=${current_location || senderAddress}
  &destination=${dropOff}
  &avoid=tolls|highways`;

  useEffect(() => {
    const details = tasks?.find((task) => task?.orderId === active);
    setCurrentLoc(
      details?.locationList[details?.locationList.length - 1]
        ?.location as string
    );

    setItemName(details?.itemName as string);
    setReceiverName(details?.receiverName as string);
    setAmount(details?.deliveryPrice as string);
    setDropOffLoc(details?.dropOffLocation as string);
    setSenderAddress(details?.pickUpLocation as string);
    setEmail(details?.email as string);
    setStatus(details?.orderStatus as string);
    setTrackingNum(details?.trackingNum as string);
    setFirstName(details?.firstName as string);
    setLastName(details?.lastName as string);
    setPhoneNum(details?.phoneNum as string);
    setItemCategory(details?.itemCategory as string);
    setReceiverPhone(details?.receiverPhone as string);
  }, [active, locationChange]);

  useEffect(() => {
    getOrderHistory();
  }, [pageNo]);

  const getOrderHistory = async () => {
    const no = active;
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get("/drivers/history?pageNo=" + pageNo + "&pageSize=" + pageSize)
        .then((res) => {
          const data = res.data.responseData;

          setPageNo(data.pageNo);
          setPageSize(data.pageSize);
          setLast(data.lastPage);
          setTasks(data.aboutOrderList);

          console.log(data);
        });

        setActive(no);

    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const updateLocation = async (orderId: number) => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .post(
          "/locations/current_location?location=" +
            locationRef.current?.value +
            "&orderId=" +
            orderId
        )
        .then((res) => {
          const data = res.data.responseMessage;
          setChange(data);
          console.log(data);
          setActive(-1);
        });
      setLocationOpen(-1);
      getOrderHistory();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setLocationError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setLocationError(err.message);

      console.log("Error: ", err);
    }
  };

  const gotoNextPage = () => {
    setPageNo(isLast ? pageNo : pageNo + 1);
  };

  const gotoPreviousPage = () => {
    setPageNo(pageNo <= 0 ? 0 : pageNo - 1);
  };

  const [infoContent, setInfoContent] = useState<JSX.Element | null>();

  const handleInfoClick = (infoType: any) => {
    switch (infoType) {
      case "orderDetails":
        setOrderDetailsClicked(!orderDetailsClicked);
        setCustomerInfoClicked(false);
        setInfoContent(
          <div className="items-stretch flex justify-between gap-5">
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                Tracking Number:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {trackingNum}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Item Category:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {itemCategory}
              </div>
            </div>
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                Item(s):
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {itemName}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Cost of Delivery:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {amount}
              </div>
            </div>
          </div>
        );
        break;

      case "customerInfo":
        setCustomerInfoClicked(!customerInfoClicked);
        setOrderDetailsClicked(false);
        setInfoContent(
          <div className="justify-between items-stretch flex gap-5">
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                First Name:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {firstName}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Email:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {email}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Address:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {senderAddress}
              </div>
            </div>
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                Last Name:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {lastName}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Contact Number:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {phoneNum}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Receiver Name:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {receiverName}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Receiver Phone:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {receiverPhone}
              </div>
            </div>
          </div>
        );
        break;
      default:
        break;
    }
  };

  const handleClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <DriverHeader current_tab={"History"} />
      <div className="bg-white flex flex-col items-center pl-8 pr-9 max-md:px-5">
        <div className="self-stretch mt-4 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 mb-[12rem]">
            <div className="flex flex-col items-stretch w-[32%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col mt-4 max-md:max-w-full max-md:mt-9">
                {tasks &&
                  tasks.map((task) => (
                    <div
                      key={task?.orderId}
                      onClick={() => {
                        setActive(task?.orderId);
                      }}
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
                            <div
                              className={`text-${
                                active === task?.orderId ? "white" : "black"
                              } text-base leading-6 tracking-normal`}
                            >
                              ID:
                            </div>
                            <div
                              className={`text-${
                                active === task?.orderId ? "white" : "black"
                              } text-base leading-6 tracking-normal text-sm`}
                            >
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
                              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                                <div className="items-center flex justify-between gap-3">
                                  <div
                                    className={`text-${
                                      active === task?.orderId
                                        ? "white"
                                        : "black"
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
                              <div
                                className={`text-${
                                  active === task?.orderId ? "white" : "black"
                                } text-base leading-6 tracking-normal`}
                              >
                                {task?.senderName}
                              </div>
                              <div
                                className={`text-${
                                  active === task?.orderId ? "white" : "black"
                                } text-base leading-6 tracking-normal`}
                              >
                                Client
                              </div>
                            </div>
                          </div>
                          {locationOpen === task?.orderId && (
                            <PortalPopup
                              overlayColor="rgba(113, 113, 113, 0.3)"
                              placement="Centered"
                              onOutsideClick={() => setLocationOpen(-1)}
                            >
                              <div>
                                <form>
                                  <ErrorText className="text-left ">
                                    {locationError}
                                  </ErrorText>
                                  <div>
                                    <label className="block uppercase text-center w-full tracking-wide text-gray-700 text-xs font-bold mb-2">
                                      Current Location
                                    </label>
                                    <Autocomplete>
                                      <input
                                        type="text"
                                        // onChange={(e) =>
                                        //   setLocation(e.target.value)
                                        // }
                                        ref={locationRef}
                                        className="py-3 px-7 rounded-[4rem]"
                                      />
                                    </Autocomplete>
                                  </div>
                                  <button
                                    className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-violet-500 px-3 py-2 rounded-[12rem] max-md:max-w-full hover:bg-violet-700 ml-[4.5rem] mt-[1rem]"
                                    type="button"
                                    onClick={() =>
                                      updateLocation(task?.orderId)
                                    }
                                  >
                                    Update
                                  </button>
                                </form>
                              </div>
                            </PortalPopup>
                          )}

                          <button
                            className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-violet-500 px-3 py-2 rounded-[12rem] max-md:max-w-full hover:bg-violet-700"
                            type="button"
                            onClick={() => setLocationOpen(task?.orderId)}
                          >
                            Update Location
                          </button>
                          <a
                            href="#"
                            onClick={() => handleClick("image7")}
                            role="button"
                            tabIndex={0}
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
                <div className="flex flex-row ">
                  <button
                    type="button"
                    className={`text-white text-l ${
                      pageNo <= 0
                        ? "bg-violet-200"
                        : "bg-violet-500 hover:bg-violet-700"
                    } mt-8 mr-[12rem] font-semibold leading-5 whitespace-nowrap justify-center items-center
              px-5 py-3 rounded-3xl max-md:max-w-full `}
                    onClick={gotoPreviousPage}
                  >
                    Previous Page
                  </button>
                  <button
                    type="button"
                    className={`text-white text-l ${
                      isLast
                        ? "bg-violet-200"
                        : "bg-violet-500 hover:bg-violet-700"
                    } mt-8 font-semibold leading-5 whitespace-nowrap justify-center items-center
              px-5 py-3 rounded-3xl max-md:max-w-full `}
                    onClick={gotoNextPage}
                  >
                    Next Page
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute top-[15%] left-[31%] bg-red-700 flex flex-col items-stretch w-[68%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col items-stretch max-md:max-w-full max-md:mt-5 ">
                <div className="flex-col overflow-hidden relative flex min-h-[509px] w-full items-center pt-12 pb-5 px-5 max-md:max-w-full">
                  <iframe
                    width="920"
                    height="509"
                    loading="lazy"
                    className="rounded-3xl"
                    allowFullScreen
                    src={
                      (current_location?.length > 3 ||
                        senderAddress?.length > 3) &&
                      dropOff?.length > 3
                        ? directionUrl
                        : embedUrl
                    }
                  ></iframe>
                  <div className="relative justify-center items-center bg-white flex w-[767px] max-w-full flex-col mt-[-6.7rem] p-4 rounded-2xl max-md:mt-10">
                    <div className="justify-between items-stretch self-stretch flex gap-5 max-md:max-w-full max-md:flex-wrap"></div>
                    <div className="flex items-center">
                      {" "}
                      {/* Apply flex styling to create a horizontal row */}
                      <div className="self-stretch stroke-[5px] w-4 h-4 flex-col rounded-[50%]" />
                      <div className="bg-violet-700 w-[166px] h-0.5 my-auto" />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe85d811-72ca-43c1-b37b-44f0ac918753?"
                        className="aspect-square object-contain object-center w-4 overflow-hidden self-stretch max-w-full"
                      />
                      <div className="bg-gray-300 w-[166px] h-0.5 my-auto" />
                      <div className="self-stretch stroke-[5px] w-4 h-4 flex-col rounded-[50%]" />
                    </div>
                    <div className="items-stretch self-stretch flex w-full justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                      <div className="justify-between items-stretch flex gap-5">
                        <div className="items-stretch flex grow basis-[0%] flex-col">
                          <div className="text-black text-xl text-base font-medium leading-5 whitespace-nowrap">
                            Pickup Location
                          </div>
                          <div className="text-black text-sm leading-5 whitespace-normal mt-1">
                            {senderAddress}
                          </div>
                        </div>
                      </div>

                      <div className="justify-between items-stretch flex gap-5">
                        <div className="items-stretch flex grow basis-[0%] flex-col">
                          <div className="text-black text-xl text-base font-medium leading-5 whitespace-nowrap">
                            Drop-Off Location
                          </div>
                          <div className="text-gray-100 text-sm leading-5 whitespace-normal mt-1">
                            {dropOff}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative items-stretch border border-[color:var(--Grey-200,#EAECF0)] flex flex-col p-4 rounded-xl border-solid bg-gray20 ml-12 max-w-[90%]">
                    <div className="justify-between items-start flex w-full gap-5 pr-4 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                      <div
                        className={`text-black text-base leading-6 tracking-normal self-center my-auto p-2.5 cursor-pointer ${
                          orderDetailsClicked
                            ? "text-violet-700 border-b-[color:var(--Log-Pri,#6926D7)] border-b-2 border-solid"
                            : ""
                        }`}
                        onClick={() => handleInfoClick("orderDetails")}
                      >
                        Order details
                      </div>

                      <div
                        className={`text-black text-base leading-6 tracking-normal my-auto p-2.5 cursor-pointer ${
                          customerInfoClicked
                            ? "text-violet-700 border-b-[color:var(--Log-Pri,#6926D7)] border-b-2 border-solid"
                            : ""
                        }`}
                        onClick={() => handleInfoClick("customerInfo")}
                      >
                        Customer Info
                      </div>
                    </div>
                    {/* Render infoContent wherever you need it in your component */}
                    {infoContent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverHistory;
