import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyHeader from "../layouts/Header/Header";
import customFetch from "../CustomFetch";
import { AxiosError } from "axios";
import CustomMap from "../components/map/GoogleMap";
import { MdDoneAll } from "react-icons/md";
import { format } from "date-fns";

interface TrackingLocationResponse {
  locationId: number;
  location: string;
  dateTime: string;
}

interface orderResponseList{
  orderId: number;
  receiver: string;
  pickUpLocation: string;
  dropOffLocation: string;
  date: string;
  status: string;
  amount: number;
  itemName: string;
  trackingNum: string;
  locationList: TrackingLocationResponse[];
}

interface OrderHistory {
  orderResponseList: orderResponseList[]
  pageNo: number;
  pageSize: number;
  lastPage: boolean;
}


const images = ["/scooter.svg", "/delivery-truck1.svg"];

const History: FunctionComponent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("History1");
  const [active, setActive] = useState(0)
  const [itemName, setItemName] = useState("")
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [dropOff, setDropOffLoc] = useState("");
  const [pickUp, setPickUpLoc] = useState("");
  const [mydate, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [trackingNum, setTrackingNum] = useState("")

  const [error, setError] = useState("")

  const [display, setDisplay] = useState(0)
  const [image, setImage] = useState("")
  const [sender, setSender] = useState("")
  const [current_location, setCurrentLoc] = useState("");
  const [current_date, setCurrentdate] = useState("")
  const [locationList, setLocationList] = useState<TrackingLocationResponse[]>()
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLast, setLast] = useState(false);
  const [orders, setOrders] = useState<orderResponseList[]>()

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {

    const details = orders?.find((orderList)=> orderList.orderId === active);

    setCurrentLoc(details?.locationList[details?.locationList.length-1]?.location as string);
    setCurrentdate(details?.locationList[details?.locationList.length-1]?.dateTime as string)
    setLocationList(details?.locationList);
    setItemName(details?.itemName as string)
    setImage(active%2 !== 0 ? images[1] : images[0])
    setReceiver(details?.receiver as string)
    setAmount(details?.amount as number)
    setDropOffLoc(details?.dropOffLocation as string)
    setPickUpLoc(details?.pickUpLocation as string)
    setDate(details?.date as string)
    setStatus(details?.status as string)
    setTrackingNum(details?.trackingNum as string)

    globalThis.senderAddress = details?.locationList[details?.locationList.length-1]?.location as string || details?.pickUpLocation as string;
    globalThis.receiverAddress = details?.dropOffLocation as string
  },[active])

  useEffect(()=> {
    getOrderHistory();
  }, [pageNo]);

  const getOrderHistory = async () => {

    try{
      const response = await customFetch(localStorage.getItem("accessToken"))
      .get("/orders/history?pageNo="+pageNo+"&pageSize="+pageSize)
      .then((res)=> {
        const data = res.data.responseData;
        
        setPageNo(data.pageNo);
        setPageSize(data.pageSize);
        setLast(data.lastPage);
        setOrders(data.orderResponseList);
      })
    }catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
    
  };

  const getImage = (orderId: number) => {
    if(orderId%2 === 0){
      return images[0];
    }else{
      return images[1];
    }
  }

  const gotoNextPage = () => {
   setPageNo(isLast ? pageNo : pageNo + 1);
  }

  const gotoPreviousPage = () => {
    setPageNo(pageNo <= 0 ? 0 : pageNo-1)
  }

  return (
      <>
      <MyHeader current_tab={"History"} />
        <div className="w-full h-[60rem] overflow-hidden text-left text-base text-main-text font-body-text-normal-16  mb-[12rem]">
        <div className="absolute bottom-[-5px] left-[1008px] flex flex-col items-start justify-start py-[50px] px-6 gap-[24px] text-darkblue">
          
          <div className="absolute bg-log-pri2 h-full top-[-800%] flex flex-col items-center justify-start pt-0 px-0 pb-6 gap-[24px] text-xs text-black ">
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="relative w-6 h-6 overflow-hidden shrink-0"
                alt=""
                src={image}
              />
              <div className="flex flex-col items-start justify-start gap-[2px]">
                <div className="relative leading-[19px] font-semibold">
                  {itemName}
                </div>
                <div className="relative text-sm leading-[19px] text-darkslategray">
                  {trackingNum}
                </div>
              </div>
            </div>
          </div>
            <div className="relative w-[350px] h-[460px] text-red top-[0px] right-[0px]  rounded-2xl">
              {/* <div className="   "> */}
              <CustomMap hieght={"50%"} width={"100%"} classSpecification={"max-w-[113%] h-[50%] top-[-10px] right-[23px]"} borderRaduis={"5%"} />
              {/* </div> */}
              
              <div className="absolute top-[226px] left-[20px] rounded-2xl bg-white flex flex-row items-center justify-start p-8 gap-[24px]">
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
                      PICKUP LOCATION
                    </div>
                    <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                      <div className="relative leading-[19px] font-medium">
                        {sender}
                      </div>
                      <div className="relative text-sm leading-[19px] whitespace-normal">{pickUp}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[8px] text-green-2">
                    <div className="relative leading-[19px] uppercase font-medium">
                      DROP-OFF LOCATION
                    </div>
                    <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                      <div className="relative leading-[19px] font-medium">
                        {receiver}
                      </div>
                      <div className="relative text-sm leading-[19px]">{dropOff}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[24px] text-base">
              <div className="flex flex-col items-center justify-start">
                <div className="relative rounded-[50%] box-border w-2.5 h-2.5 border-[3px] border-solid border-white" />
                <div className="relative box-border w-px h-[51px] border-r-[1px] border-dashed border-white" />
                <div className="relative rounded-[50%] box-border w-2.5 h-2.5 border-[3px] border-solid border-log-pri" />
                <div className="relative box-border w-px h-[51px] border-r-[1px] border-dashed border-white" />
                <div className="relative rounded-[50%] box-border w-2.5 h-2.5 border-[3px] border-solid border-white" />
              </div>
              <div className="relative mt-[4rem] flex flex-col items-start justify-start gap-[24px]">
                <div className="w-[326px] flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-start gap-[4px]">
                    <div className="relative leading-[19px] font-medium">
                     Start
                    </div>
                    <div className="relative text-sm leading-[19px] whitespace-normal">
                      {pickUp}
                    </div>
                  </div>
                  <div className="relative text-sm leading-[19px]">
                    {mydate?.trim.length > 3 ? format(new Date(mydate), 'EEE,MMM do, yyyy hh:mm a') : ""}
                  </div>
                </div>

                {locationList && locationList.map((locate, i)=><> <div className="w-[326px] flex flex-row items-center justify-between">
                  <div className="flex flex-row items-start justify-start gap-[4px]">
                    <div className="relative leading-[19px] font-medium">
                    {i < locationList.length-1 && (<MdDoneAll />)}
                    </div>
                    <div className="relative text-sm leading-[19px] whitespace-normal">
                      {i < locationList.length-1 && locate?.location}
                    </div>
                  </div>
                  <div className="relative text-sm leading-[19px]">
                    {i < locationList.length-1 && format(new Date(locate?.dateTime), 'EEE,MMM do, yyyy hh:mm a')}
                  </div>
                </div>

                {i === locationList.length-1 && (<div className="w-[326px] flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-start gap-[4px]">
                    <div className="relative leading-[19px] font-medium">
                     Current Location
                    </div>
                    <div className="relative text-sm leading-[19px] whitespace-normal">
                      {locate?.location}
                    </div>
                  </div>
                  <div className="relative text-sm leading-[19px]">
                    {format(new Date(locate?.dateTime), 'EEE,MMM do, yyyy hh:mm a')}
                  </div>
                </div>)}
                </>
                )}
{/* 
                <div className="w-[326px] flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-start gap-[4px]">
                    <div className="relative leading-[19px] font-medium">
                     Current Location
                    </div>
                    <div className="relative text-sm leading-[19px] whitespace-normal">
                      {current_location}
                    </div>
                  </div>
                  <div className="relative text-sm leading-[19px]">
                    {mydate?.trim.length > 3 ? format(new Date(current_date), 'EEE,MMM do, yyyy hh:mm a') : ""}
                  </div>
                </div> */}

                <div className="w-[226px] flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-start gap-[4px]">
                    <div className="relative leading-[19px] font-medium">
                      Finish
                    </div>
                    <div className="relative text-sm leading-[19px]">
                     {dropOff}
                    </div>
                  </div>
                  <div className="relative text-sm leading-[19px]">
                    {"----:--:--"}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[279px] flex flex-row items-start justify-between text-xl">
              <div className="relative leading-[19px] font-semibold">
                Total Cost:
              </div>
              <div className="relative leading-[19px] font-semibold">
                {amount}
              </div>
            </div>
            <div className="self-stretch rounded-81xl bg-log-pri cursor-pointer hover:bg-purple-500 overflow-hidden flex flex-row items-center justify-center py-5 px-4 gap-[8px] text-sm text-white border-[1px] border-solid border-log-pri2 rounded-3xl  mb-[12rem]">
              <div onClick={()=> navigate("/create_order")} className="relative tracking-[2px] leading-[20px] uppercase  font-medium ">
                Order again
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-[calc(50%_-_331px)] left-[calc(50%_-_678px)] rounded-[10px] bg-white shadow-[0px_45px_112px_rgba(0,_0,_0,_0.06),_0px_22.78125px_48.83px_rgba(0,_0,_0,_0.04),_0px_9px_18.2px_rgba(0,_0,_0,_0.03),_0px_1.96875px_6.47px_rgba(0,_0,_0,_0.02)] w-[966px] overflow-hidden flex flex-col items-start justify-start text-sm text-darkslategray">
          <div className="self-stretch bg-gray20 box-border h-[42px] flex flex-row items-center justify-start py-0 px-5 gap-[20px] text-smi text-gray-200 border-[1px] border-solid border-black">
            <div className="relative rounded-[3px] bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.2)_inset] w-3.5 h-3.5" />
            <div className="self-stretch flex-1 flex flex-row items-center justify-center gap-[10px]">
              <div className="self-stretch flex-1 flex flex-row items-center justify-start">
                <div className="self-stretch flex-1 relative leading-[19px] font-medium flex items-center">
                  Receiver/Sender
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-row items-center justify-start">
                <div className="self-stretch flex-1 relative leading-[19px] font-medium flex items-center">
                  Address
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-row items-center justify-start">
                <div className="self-stretch flex-1 relative leading-[19px] font-medium flex items-center">
                  Date
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-row items-center justify-start">
                <div className="self-stretch flex-1 relative leading-[19px] font-medium flex items-center">
                  Location
                </div>
              </div>
              <div className="self-stretch flex-1 flex flex-row items-center justify-start">
                <div className="self-stretch flex-1 relative leading-[19px] font-medium flex items-center">
                  Price
                </div>
              </div>
            </div>
          </div>
          {orders && orders.map((item) => 
            <div onClick={()=> {
              setActive(item.orderId)
              }} key={item.orderId} className={`self-stretch ${active === item.orderId ? "bg-log-pri" : "bg-white"} box-border h-[62px] cursor-pointer overflow-hidden shrink-0 flex flex-row items-center justify-start py-0 px-5 gap-[20px] border-[1px] border-solid border-thistle`}>
              
              <img
                className="relative w-6 h-6 overflow-hidden shrink-0"
                alt=""
                src={getImage(item.orderId)}
              />
              <div className="self-stretch flex-1 flex flex-row items-center justify-center gap-[10px]">
                <div className="self-stretch flex-1 flex flex-row pt-5 items-center justify-start">
                  <div className="self-stretch flex-1 relative leading-[19px] [display:-webkit-inline-box] items-center overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    {item.receiver}
                  </div>
                </div>
                <div className="self-stretch flex-1 flex flex-row pt-5 justify-center items-center justify-start">
                  <div className="self-stretch flex-1 relative leading-[19px] [display:-webkit-inline-box] items-center overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    {item.dropOffLocation}
                  </div>
                </div>
                <div className="self-stretch flex-1 flex flex-row pt-5 items-center justify-start">
                  <div className="self-stretch flex-1 relative leading-[19px] [display:-webkit-inline-box] items-center overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                    {format(new Date(item.date), 'EEE,MMM do, yyyy hh:mm a')}
                  </div>
                </div>
                <div className="self-stretch flex-1 flex flex-row items-center justify-start text-black">
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-2.5 h-2.5"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative leading-[19px]">Transit</div>
                  </div>
                </div>
                <div className="self-stretch flex-1 relative overflow-hidden text-black">
                  <div className="absolute top-[calc(50%_-_10px)] left-[0.2px] leading-[19px]">
                    {item.amount}
                  </div>
                </div>
              </div>
            </div>
            )}
            <div className="flex flex-row ">
            <button type="button" 
            className={`text-white text-l ${pageNo <= 0 ? "bg-violet-200" : "bg-violet-500 hover:bg-violet-700"} mt-8 mr-[45rem] font-semibold leading-5 whitespace-nowrap justify-center items-center
              px-5 py-3 rounded-3xl max-md:max-w-full `}
             onClick={gotoPreviousPage}
             >Previous Page</button>
            <button type="button" 
            className={`text-white text-l ${isLast ? "bg-violet-200" : "bg-violet-500 hover:bg-violet-700"} mt-8 font-semibold leading-5 whitespace-nowrap justify-center items-center
              px-5 py-3 rounded-3xl max-md:max-w-full `}
             onClick={gotoNextPage}
             >Next Page</button>
            </div>
        </div>
        </div>
    </>
  );
};

export default History;
