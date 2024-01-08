import MyHeader from "../layouts/Header/Header";
import ClickToOrder from "../components/ClickToOrder";
import { useEffect, useState } from "react";
import CustomMap from "../components/map/GoogleMap";
import { AxiosError } from "axios";
import customFetch from "../CustomFetch";
import { format } from "date-fns";

interface DeliveryStatus {
  taskStatusDate: string;
  deliveryStatusDate: string;
  pickUpDate: string;
  deliveryDate: string;
}

interface DriverInfo {
  phoneNo: string;
  driverId: number;
  firstName: string;
  lastName: string;
}

interface LastestOrder {
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  deliveryStatus: DeliveryStatus;
  driverInfo: DriverInfo;
}

const Overvie = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [error, setError] = useState("");
  const [lastestOrder, setOrder] = useState<LastestOrder | null>();

  const [driverStatus, setDriverStatus] = useState(false);
  const [driverInfoClicked, setDriverInfoClicked] = useState(false);
  const [infoContent, setInfoContent] = useState<JSX.Element | null>();

  useEffect(() => {
    getLastestOrder();
  }, []);

  const getLastestOrder = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get("/orders/overview")
        .then((res) => {
          const data = res.data.responseData;
          setOrder(data);
          globalThis.senderAddress = data.senderAddress;
          globalThis.receiverAddress = data.receiverAddress;
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const handleInfoClick = (infoType: any) => {
    switch (infoType) {
      case "deliveryStatus":
        setDriverStatus(!driverStatus);
        setDriverInfoClicked(false);
        setInfoContent(
          <div className="items-stretch flex flex-col ">
            <div className="items-center bg-white flex justify-between gap-5 mt-6 p-6 max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/576ab3ebb85afc4269e9b25263c98b802fbb68b9dd02351820f1fc59ff635ebc?"
                className="aspect-[0.09] object-contain object-center w-2 items-center overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                <div className="justify-between items-stretch flex gap-5">
                  <div className="text-black text-sm leading-5 whitespace-nowrap">
                    Accepted Order
                  </div>
                  <div className="text-black text-sm leading-5 whitespace-normal">
                    {format(new Date(lastestOrder?.deliveryStatus.taskStatusDate+""), 'EEE,MMM do, yyyy hh:mm a')}
                  </div>
                </div>
                <div className="justify-between items-stretch flex gap-5 mt-2.5">
                  <div className="text-black text-sm leading-5 whitespace-nowrap">
                    En Route
                  </div>
                  <div className="text-black text-sm leading-5 whitespace-normal">
                    {format(new Date(lastestOrder?.deliveryStatus.deliveryStatusDate+""), 'EEE,MMM do, yyyy hh:mm a')}
                  </div>
                </div>
                <div className="justify-between items-stretch flex gap-5 mt-2.5">
                  <div className="text-black text-sm leading-5 whitespace-nowrap">
                    At Pickup Location
                  </div>
                  <div className="text-black text-sm leading-5 whitespace-normal">
                    {format(new Date(lastestOrder?.deliveryStatus.pickUpDate+""), 'EEE,MMM do, yyyy hh:mm a')}
                  </div>
                </div>
                <div className="justify-between items-stretch flex gap-5 mt-2.5">
                  <div className="text-black text-sm leading-5 whitespace-nowrap">
                    Delivered
                  </div>
                  <div className="text-black text-sm leading-5 whitespace-nowrap">
                    {lastestOrder?.deliveryStatus.deliveryDate?.substring(0, lastestOrder?.deliveryStatus.deliveryDate?.lastIndexOf(":"))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "driverInfo":
        setDriverInfoClicked(!driverInfoClicked);
        setDriverStatus(false);
        setInfoContent(
          <div className="items-stretch flex flex-col">
            <div className="items-center bg-white flex w-full flex-col mt-6 px-12 py-7 max-md:px-5">
              <div className="items-stretch self-center flex gap-3">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/02487d23-1063-4dbe-b3bf-f05c18e2bcbf?"
                  className="aspect-square object-contain object-center w-[50px] overflow-hidden shrink-0 max-w-full rounded-[50%]"
                />
                <div className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                  <div className="text-gray-500 text-sm font-light leading-5 tracking-normal whitespace-nowrap">
                    Driver
                  </div>
                  <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
                    {lastestOrder?.driverInfo.firstName}{" "}
                    {lastestOrder?.driverInfo.lastName}
                  </div>
                </div>
              </div>
              <div className="items-stretch self-center flex w-[82px] max-w-full gap-1 mt-3 max-md:justify-center"></div>
              <div className="items-center bg-violet-100 self-center flex gap-3 mt-3 px-5 py-2 rounded-xl">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/952b319c894fc3bf7c545c026f4eb989ec1a8fe61f42f3fcacb6b80c4aec9633?"
                  className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full my-auto"
                />
                <div className="text-violet-700 text-base font-semibold leading-6 tracking-normal self-stretch grow whitespace-nowrap">
                  Message
                </div>
              </div>
              <div className="justify-between items-stretch self-stretch flex gap-5 mt-8">
                <div className="text-black text-base leading-6 tracking-normal whitespace-nowrap">
                  Phone Number:
                </div>
                <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
                  {lastestOrder?.driverInfo.phoneNo}
                </div>
              </div>
              <div className="justify-between items-stretch self-stretch flex gap-5 mt-2.5">
                <div className="text-black text-base leading-6 tracking-normal whitespace-nowrap">
                  Vehicle Type:
                </div>
                <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
                  Car
                </div>
              </div>
              <div className="justify-between items-stretch self-stretch flex gap-5 mt-2.5 pr-14 max-md:pr-5">
                <div className="text-black text-base leading-6 tracking-normal whitespace-nowrap">
                  Driver ID:
                </div>
                <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
                  ID{lastestOrder?.driverInfo.driverId}
                </div>
              </div>
              <div className="justify-between items-stretch self-stretch flex gap-5 mt-2.5">
                <div className="text-black text-base leading-6 tracking-normal whitespace-nowrap">
                  First Name:
                </div>
                <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
                  {lastestOrder?.driverInfo.firstName}
                </div>
              </div>
              <div className="justify-between items-stretch self-stretch flex gap-5 mt-2.5">
                <div className="text-black text-base leading-6 tracking-normal whitespace-nowrap">
                  Last Name:
                </div>
                <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
                  {lastestOrder?.driverInfo.lastName}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MyHeader current_tab={"Overview"} />
      <div className="absolute top-[100%] left-[978px] flex flex-col items-center justify-start py-4 px-8 gap-[32px] text-sm text-black  mb-[12re]">
        <div className="flex flex-col items-center justify-start gap-[8px]">
          <div className="relative w-[350px] h-[460px] text-xs text-red">
            <div className="top-[0px] right-[0px]  rounded-2xl  ">
              <CustomMap
                hieght={"50%"}
                width={"100%"}
                classSpecification={
                  "max-w-[113%] h-[50%] top-[-10px] right-[13px]"
                }
                borderRaduis={"5%"}
              />
            </div>
            <div className="absolute top-[296px] left-[20px] rounded-2xl bg-white flex flex-row items-center justify-start p-8 gap-[24px] border border-[color:var(--Grey-500,#EAECF0)] ">
              <div className="flex flex-col items-center justify-start">
                <div className="relative rounded-[50%] bg-red w-2.5 h-2.5" />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative box-border w-px h-[61px] border-r-[1px] border-dashed border-red" />
                  <div className="relative box-border w-px h-12 border-r-[1px] border-dashed border-green-2" />
                </div>
                <div className="relative rounded-[50%] box-border w-2.5 h-2.5 border-[2px] border-solid border-green-2" />
              </div>
              <div className="flex flex-col items-start justify-start gap-[32px]">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                  <div className="relative leading-[19px] uppercase font-medium">
                    SENDER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      {lastestOrder?.senderName}
                    </div>
                    <div className="relative text-sm leading-[19px]">{lastestOrder?.senderAddress}</div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[8px] text-green-2">
                  <div className="relative leading-[19px] uppercase font-medium">
                    RECEIVER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      {lastestOrder?.receiverName}
                    </div>
                    <div className="relative text-sm leading-[19px]">{lastestOrder?.receiverAddress}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div> */}
        <div className="relative items-stretch border border-[color:var(--Grey-200,#EAECF0)] flex flex-col p-4 rounded-xl border-solid bg-gray20 ml-12 max-w-[100%] top-[96px] left-[-35px]">
          <div className="justify-between items-start flex w-full gap-5 pr-4 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <div
              className={`text-black text-base leading-6 tracking-normal self-center my-auto p-2.5 cursor-pointer ${
                driverStatus
                  ? "text-violet-700 border-b-[color:var(--Log-Pri,#6926D7)] border-b-2 border-solid"
                  : ""
              }`}
              onClick={() => handleInfoClick("deliveryStatus")}
            >
              Delivery Status
            </div>
            <div
              className={`text-black text-base leading-6 tracking-normal self-center my-auto p-2.5 cursor-pointer ${
                driverInfoClicked
                  ? "text-violet-700 border-b-[color:var(--Log-Pri,#6926D7)] border-b-2 border-solid"
                  : ""
              }`}
              onClick={() => handleInfoClick("driverInfo")}
            >
              Driver Info
            </div>
          </div>
          {/* Render infoContent wherever you need it in your component */}
          {infoContent}
        </div>
        {/* </div> */}
      </div>
      <ClickToOrder />
    </>
  );
};

export default Overvie;
