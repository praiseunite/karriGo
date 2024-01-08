import * as React from "react";
import CustomMap from "../components/map/GoogleMap";
import MyHeader from "../layouts/Header/Header";
import { AxiosError } from "axios";
import customFetch from "../CustomFetch";
import { useEffect } from "react";

function FindTrack(props: any) {
  const [trackingNum, setTrackingNum] = React.useState("");
  const [error, setError] = React.useState("");

  console.log("Tracking num: ",globalThis.trackingNum);

  useEffect(()=> {
    const interval = setInterval(()=> {
      setTrackingNum(globalThis.trackingNum);
    }, 1000)

    return ()=> clearInterval(interval);
  }, [])

  useEffect(()=>{
    trackOrder(); 
  }, [trackingNum]);

  const trackOrder = async () => {
    console.log("Tracking num: ",globalThis.trackingNum);

    try {
      const response = await customFetch(
        localStorage.getItem("accessToken")
      ).get("/orders/track_order?trackingNum="+ globalThis.trackingNum)
      .then((res)=> {
        const data = res.data.responseData
        globalThis.senderAddress = data.pickUpLocation;
        globalThis.receiverAddress = data.dropOffLocation;
        console.log(data.pickUpLocation);
        console.log(data.dropOffLocation);
      });
      console.log("Transaction response--->>>", response);
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  }
  return (
    <>
    <MyHeader current_tab={"Find Track"}/>
    <div className="bg-white flex flex-col items-center px-9 max-md:px-5">
      <div className="aspect-[1.63] object-contain object-center w-full overflow-hidden self-stretch mt-6 mb-9 max-md:max-w-full">
        <CustomMap hieght={"100%"} width={"100%"} classSpecification={""} borderRaduis={"0%"} />
      </div>
    </div>
    </>
  );
}

export default FindTrack;
