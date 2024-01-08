import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DriverHeader from "../layout/header/DriverHeader";
import { AxiosError } from "axios";
import customFetch from "../../CustomFetch";

const googleMapsApiKey: string = process.env
  .REACT_APP_GOOGLE_MAPS_API_KEY as string;

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

function DriverFindTrack() {
  const [error, setError] = useState("");
  const [modalIsOpen, setModalOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const backgroundColor = isHighlighted ? "bg-violet-300" : "bg-violet-100";
  const [orderDetailsClicked, setOrderDetailsClicked] = useState(false);
  const [senderInfoClicked, setSenderInfoClicked] = useState(false);
  const [receiverInfoClicked, setReceiverInfoClicked] = useState(false);

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
  const [tasks, setTasks] = useState<TaskHistory | null>();

  useEffect(() => {
    setCurrentLoc(
      tasks?.locationList[tasks?.locationList.length - 1]?.location as string
    );

    setItemName(tasks?.itemName as string);
    setReceiverName(tasks?.receiverName as string);
    setAmount(tasks?.deliveryPrice as string);
    setDropOffLoc(tasks?.dropOffLocation as string);
    setSenderAddress(tasks?.pickUpLocation as string);
    setEmail(tasks?.email as string);
    setStatus(tasks?.orderStatus as string);
    setTrackingNum(tasks?.trackingNum as string);
    setFirstName(tasks?.firstName as string);
    setLastName(tasks?.lastName as string);
    setPhoneNum(tasks?.phoneNum as string);
    setItemCategory(tasks?.itemCategory as string);
    setReceiverPhone(tasks?.receiverPhone as string);
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingNum(globalThis.trackingNum);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    track();
  }, [trackingNum]);

  const directionUrl = `https://www.google.com/maps/embed/v1/directions?key=${googleMapsApiKey}
  &origin=${current_location || senderAddress}
  &destination=${dropOff}
  &avoid=tolls|highways`;

  const track = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get("/drivers/find_track?trackingNum=" + globalThis.trackingNum)
        .then((res) => {
          const data = res.data.responseData;
          setTasks(data);
          console.log(data);
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const closeOrder = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .put("/drivers/order_status_update?trackingNum=" + globalThis.trackingNum+"&status=DELIVERED")
        .then((res) => {
          const data = res.data.responseData;
          console.log(data);
        });

        openModal();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const [infoContent, setInfoContent] = useState<JSX.Element | null>(
    orderDetailsClicked ? (
      <div className="items-stretch flex justify-between gap-5 mb-[3rem]">
        <div className="items-stretch flex grow basis-[0%] flex-col px-5">
          <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
            Tracking Number:
          </div>
          <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
            {tasks?.trackingNum}
          </div>
          <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
            Item Category:
          </div>
          <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
            {tasks?.itemCategory}
          </div>
        </div>
        <div className="items-stretch flex grow basis-[0%] flex-col px-5">
          <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
            Item(s):
          </div>
          <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
            {tasks?.itemName}
          </div>
          <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
            Cost of Delivery:
          </div>
          <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
            {tasks?.deliveryPrice}
          </div>
        </div>
      </div>
    ) : null
  );

  const handleInfoClick = (infoType: any) => {
    switch (infoType) {
      case "orderDetails":
        setOrderDetailsClicked(!orderDetailsClicked);
        setSenderInfoClicked(false);
        setReceiverInfoClicked(false);
        setInfoContent(
          <div className="items-stretch flex justify-between gap-5 mb-[3rem]">
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                Tracking Number:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.trackingNum}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Item Category:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.itemCategory}
              </div>
            </div>
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                Item(s):
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.itemName}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Cost of Delivery:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.deliveryPrice}
              </div>
            </div>
          </div>
        );
        break;
      case "senderInfo":
        setSenderInfoClicked(!senderInfoClicked);
        setOrderDetailsClicked(false);
        setReceiverInfoClicked(false);
        setInfoContent(
          <div className="items-stretch flex justify-between gap-5 mb-[3rem]">
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                First Name:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.firstName}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Email:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.email}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Address:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.pickUpLocation}
              </div>
            </div>
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                Last Name:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.lastName}
              </div>
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Contact Number:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.phoneNum}
              </div>
            </div>
          </div>
        );
        break;
      case "receiverInfo":
        setReceiverInfoClicked(!receiverInfoClicked);
        setOrderDetailsClicked(false);
        setSenderInfoClicked(false);
        setInfoContent(
          <div className="items-stretch flex justify-between gap-5">
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase">
                Receiver Name:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.receiverName}
              </div>
            </div>
            <div className="items-stretch flex grow basis-[0%] flex-col px-5">
              <div className="text-zinc-500 text-sm leading-5 tracking-normal uppercase mt-3">
                Contact Number:
              </div>
              <div className="text-black text-base font-semibold leading-6 tracking-normal mt-2.5">
                {tasks?.receiverPhone}
              </div>
            </div>
          </div>
        );
        break;
      default:
        break;
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleImageClick = () => {
    setIsHighlighted((prevIsHighlighted) => !prevIsHighlighted);
  };

  return (
    <>
      <DriverHeader current_tab={"Find Track"} />
      <div className="bg-white flex flex-col px-9 max-md:px-5">
        <div className="justify-between items-stretch self-center flex w-full max-w-[1290px] gap-5 mt-3 max-md:max-w-full max-md:flex-wrap"></div>
        <div className="self-center flex w-full max-w-[1340px] justify-between gap-5 mt-8 max-md:max-w-full max-md:flex-wrap">
          <div
            className={`items-stretch ${backgroundColor} self-stretch flex justify-between gap-3 px-5 py-2 rounded-xl`}
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center">
              <div onClick={closeOrder} className="flex">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/08ffdb0d-670c-4e39-9933-31499f6fd8e5?"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full mt-0"
                
              />
              <div
                className="text-violet-700 text-base font-semibold leading-6 tracking-normal grow whitespace-nowrap mt-0"
              >
                Complete Delivery?
              </div>
              </div>
              <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                className="absolute w-[30%] bg-transparent border-none top-[20%] left-[35%] justify-center items-center"
                onRequestClose={closeModal}
              >
                <div className="justify-center items-center bg-gray-50 flex flex-col px-8 rounded-2xl max-md:px-5">
                  <div className="text-violet-700 text-2xl font-medium leading-8 whitespace-nowrap mt-8">
                    Delivery Successfully Completed!
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d432e77c-6461-4793-b588-94b8b0b03702?"
                    className="aspect-square object-contain object-center w-20 overflow-hidden max-w-full mt-8"
                  />
                  <div className="text-zinc-500 text-center text-base font-medium leading-6 self-stretch mt-8 max-md:max-w-full">
                    Thank you for your dedication to excellent service!
                  </div>
                  <div
                    className="text-zinc-100 text-base font-bold leading-3 whitespace-nowrap justify-center items-center bg-violet-700  m-8 p-5 px-20 rounded-[100px] max-md:max-w-full"
                    onClick={closeModal}
                  >
                    Continue
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div className="flex-col overflow-hidden self-stretch relative flex min-h-[446px] items-center mt-6 pt-12 px-5 max-md:max-w-full">
          <iframe
            width="1372"
            height="746"
            loading="lazy"
            allowFullScreen
            src={
              (current_location?.length > 3 || senderAddress?.length > 3) &&
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
                    {tasks?.pickUpLocation}
                  </div>
                </div>
                {/* <div className="text-black text-sm leading-5 self-center grow whitespace-nowrap my-auto">
                          12 Jun, 08:34
                        </div> */}
              </div>

              <div className="justify-between items-stretch flex gap-5">
                <div className="items-stretch flex grow basis-[0%] flex-col">
                  <div className="text-black text-xl text-base font-medium leading-5 whitespace-nowrap">
                    Drop-Off Location
                  </div>
                  <div className="text-gray-100 text-sm leading-5 whitespace-normal mt-1">
                    {tasks?.dropOffLocation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="items-stretch border border-[color:var(--Grey-200,#EAECF0)] flex flex-col p-4 rounded-xl border-solid mb-[4rem]">
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
                className={`text-black text-base leading-6 tracking-normal self-center my-auto p-2.5 cursor-pointer ${
                  senderInfoClicked
                    ? "text-violet-700 border-b-[color:var(--Log-Pri,#6926D7)] border-b-2 border-solid"
                    : ""
                }`}
                onClick={() => handleInfoClick("senderInfo")}
              >
                Sender Info
              </div>
              <div
                className={`text-black text-base leading-6 tracking-normal my-auto p-2.5 cursor-pointer ${
                  receiverInfoClicked
                    ? "text-violet-700 border-b-[color:var(--Log-Pri,#6926D7)] border-b-2 border-solid"
                    : ""
                }`}
                onClick={() => handleInfoClick("receiverInfo")}
              >
                Receiver Info
              </div>
            </div>
            {/* Render infoContent wherever you need it in your component */}
            {infoContent}
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverFindTrack;
