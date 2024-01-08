import * as React from "react";
import { useEffect, useState } from "react";
import customFetch from "../CustomFetch";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const OrderDescription = {
  itemName: "",
  itemDescription: "",
  length: 0,
  width: 0,
  height: 0,
  itemWeight: 0,
  declaredPrice: 0,
  itemCategory: "",
  pickUpLocation: "",
  dropOffLocation: "",
  distance: 0,
  senderName: "",
  senderPhone: "",
  receiverName: "",
  receiverPhone: "",
};

function OrderSummary(props: any) {
  const [error, setError] = useState("");
  const [isSelected, setSelecte] = useState(false);
  const [distance, setDistance] = useState("");

  const [itemName, setItemName] = useState("");
  const [len, setLen] = useState(0);
  const [weight, setWeighht] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [declaredPrice, setDeclaredPrice] = useState(0);
  const [itemCategory, setCategory] = useState("");
  const [itemDescription, setDescription] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [sendAddress, setSenderAddress] = useState("");
  const [weightCost, setWeightCost] = useState(0);
  const [totalCost, setTotal] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // calculateRoute();
      checkDetails();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  async function calculateRoute() {
    if (
      globalThis.senderAddress === undefined ||
      globalThis.receiverAddress === undefined
    ) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results: any = await directionsService
      .route({
        origin: globalThis.senderAddress,
        destination: globalThis.receiverAddress,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((results) => {
        console.log("Sender address>>>", globalThis.senderAddress);
        console.log("Reciever Address>>>", globalThis.receiverAddress);
        console.log("Distance>>>", results.routes[0].legs[0].distance?.text);

        getQuotation(results.routes[0].legs[0].distance?.text || "");
      });

    console.log("Sender address>>>", globalThis.senderAddress);
    console.log("Reciever Address>>>", globalThis.receiverAddress);
  }

  const navigate = useNavigate();

  const paymentPage = () => {
    navigate("/paystack");
  };

  function getOrderDescription(distance: string) {
    OrderDescription.itemName = itemName;
    OrderDescription.itemDescription = itemDescription;
    OrderDescription.itemCategory = itemCategory;
    OrderDescription.itemWeight = weight;
    OrderDescription.declaredPrice = declaredPrice;
    OrderDescription.length = len;
    OrderDescription.height = height;
    OrderDescription.width = width;
    OrderDescription.dropOffLocation = globalThis.receiverAddress;
    OrderDescription.pickUpLocation = globalThis.senderAddress;
    OrderDescription.distance = parseInt(
      distance.substring(0, distance.indexOf(" "))
    );
    OrderDescription.senderName = senderName;
    OrderDescription.senderPhone = senderPhone;
    OrderDescription.receiverName = receiverName;
    OrderDescription.receiverPhone = receiverPhone;

    setDistance(distance);

    return OrderDescription;
  }

  const getQuotation = async (distance: string) => {
    const OrderDescription = getOrderDescription(distance);

    console.log("Distance ---> ", distance.substring(0, distance.indexOf(" ")));
    console.log("Order Details>>>>>>", OrderDescription);
    setError("");

    try {
      await customFetch(localStorage.getItem("accessToken"))
        .post("/orders/quotation", OrderDescription)
        .then((response: any) => response.data.responseData)
        .then((result) => {
          const res: any = Object.values(result);
          console.log(res);

          setWeightCost(res[1]);
          setTotal(res[2]);

          console.log(res);
        });

      // paymentPage();
      setSelecte(true);
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const placeOrder = async () => {
    const OrderDescription = getOrderDescription(distance);

    console.log("Distance ---> ", distance.substring(0, distance.indexOf(" ")));
    console.log("Order Details>>>>>>", OrderDescription);
    setError("");

    try {
      await customFetch(localStorage.getItem("accessToken"))
        .post("/orders/create", OrderDescription)
        .then((response: any) => response.data.responseData)
        .then((result) => {
          const res: any = Object.values(result);
          console.log(res);
          localStorage.setItem("transactionId", res[0]);
          localStorage.setItem("amount", res[2]);

          console.log(res);
        });

      paymentPage();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  function checkDetails() {
    setItemName(globalThis.itemName);
    setCategory(globalThis.itemCategory);
    setDeclaredPrice(globalThis.declaredPrice);
    setLen(globalThis.length);
    setWeighht(globalThis.itemWeight);
    setWidth(globalThis.width);
    setHeight(globalThis.height);
    setReceiverAddress(globalThis.receiverAddress);
    setReceiverName(globalThis.receiverName);
    setReceiverPhone(globalThis.receiverPhone);
    setSenderAddress(globalThis.senderAddress);
    setSenderName(globalThis.senderName);
    setSenderPhone(globalThis.senderPhone);
    setDescription(globalThis.itemDescription);
  }

  return (
    <>
      <div className=" items-stretch border text-left border-[color:var(--Grey-300,#D0D5DD)] flex flex-col mt-4 mb-6 px-3 py-4 rounded-xl border-solid max-md:max-w-full">
        <div className="text-black text-2xl font-semibold leading-5 capitalize self-stretch whitespace-nowrap">
          Summary
        </div>
        <div className="opacity-[0.64] bg-black bg-opacity-20 self-stretch shrink-0 h-0.5 mt-6" />
        <div className="text-black text-base font-light text-2xl leading-5 capitalize self-stretch whitespace-nowrap mt-6">
          Item
        </div>
        <div className="text-black text-base text-xl leading-5 capitalize self-stretch whitespace-normal mt-4">
          Name: {itemName}
        </div>
        <div className="text-black text-base leading-5 capitalize self-stretch  mt-2">
          Dimensions: {len}mm x {width}mm x {height}mm - {weight}kg
        </div>
        <div className="text-black text-base leading-5  self-stretch  mt-2">
          Declared Price: ₦{declaredPrice}
        </div>
        <div className="text-black text-base leading-5  self-stretch mt-2">
          Description: {itemDescription}
        </div>
        <div className="text-black text-base leading-5 capitalize self-stretch whitespace-nowrap mt-2">
          Category: {itemCategory}
        </div>
        <div className="opacity-[0.64] bg-black bg-opacity-20 self-stretch shrink-0 h-0.5 mt-6" />
        <div className="text-black text-base leading-5 capitalize whitespace-nowrap mt-6 self-start">
          From
        </div>
        <div className="text-black text-xl font-medium leading-5   mt-2 self-start">
          {sendAddress}
        </div>
        <div className="text-black text-base leading-5 capitalize  mt-8 self-start">
          to
        </div>
        <div className="text-black text-xl font-medium leading-5   mt-2 self-start">
          {receiverAddress}
        </div>
        <div className="opacity-[0.64] bg-black bg-opacity-20 self-stretch shrink-0 h-0.5 mt-6" />
        <div className="justify-center items-stretch self-stretch bg-white flex w-full flex-col mt-6">
          <div className="justify-between items-stretch flex gap-5">
            <div className="text-black text-base leading-6 tracking-normal">
              Weight:
            </div>
            <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
              ₦ {weightCost}
            </div>
          </div>
          {/* <div className="justify-between items-stretch flex gap-5 mt-2.5">
            <div className="text-black text-base leading-6 tracking-normal">
              Item:
            </div>
            <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
              1 x ₦20,000
            </div>
          </div> */}
          <div className="justify-between items-stretch flex gap-5 mt-2.5">
            <div className="text-black text-base leading-6 tracking-normal">
              Fees:
            </div>
            <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
              ₦ {totalCost - weightCost}
            </div>
          </div>
        </div>
        <div className="justify-between items-stretch self-stretch flex gap-5 mt-20 max-md:mt-10">
          <div className="text-black text-xl leading-5 capitalize">Total</div>
          <div className="text-black text-2xl font-medium leading-5 capitalize whitespace-nowrap">
            ₦ {totalCost}
          </div>
        </div>

        {!isSelected && (
          <>
            <div className="opacity-[0.64] bg-black bg-opacity-20 self-stretch shrink-0 h-0.5 mt-6" />
            <button
              className="text-white text-base font-semibold leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-center self-stretch border border-[color:var(--Log-Pri2,#EEE3FF)] bg-violet-500  hover:bg-violet-900 mt-6 px-5 py-3 rounded-[100px] border-solid "
              autoFocus={true}
              type="button"
              onClick={calculateRoute}
            >
              Get Quotation
            </button>
          </>
        )}

        {isSelected && (
          <>
            <div className="opacity-[0.64] bg-black bg-opacity-20 self-stretch shrink-0 h-0.5 mt-6" />
            <button
              className="text-white text-base font-semibold leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-center self-stretch border border-[color:var(--Log-Pri2,#EEE3FF)] bg-violet-700 hover:bg-violet-700 mt-6 px-5 py-3 rounded-[100px] border-solid "
              autoFocus={true}
              type="button"
              onClick={placeOrder}
            >
              Create Order
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default OrderSummary;
