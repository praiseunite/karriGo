import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import "../paymentPage/Paystack.css";
import customFetch from "../../CustomFetch";
import { AxiosError } from "axios";
import MyHeader from "../../layouts/Header/Header";
import { useNavigate } from "react-router-dom";

const publicKey: string = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY as string;

const config = {
  reference: new Date().getTime().toString(),
  email: localStorage.getItem("email") || "karrigo.ng@gmail.com",
  publicKey,
};

const Transact = {
  transactionId: 0,
  referenceId: ""
};

const Paystack = () => {
  const navigate = useNavigate();
  const storedAmount = localStorage.getItem("amount");
  let amount = 0;
  if (storedAmount !== null) amount = parseFloat(storedAmount) * 100.0;

  const storedTransactId = localStorage.getItem("transactionId");
  let transactId = 0;
  if (storedTransactId !== null) transactId = parseInt(storedTransactId);

  const [paymentRef, setReference] = useState("");
  const [error, setError] = useState("");

  const componentProps = {
    amount,
    ...config,
    text: "Make Payment",
    onSuccess: ({ reference }: any) => {
      setReference(reference || "");

      updateTransaction(reference);
      alert(`Your payment was successful! Transaction reference: ${reference}`);

      navigate("/create_order");
    },
    onClose: () => alert("Are you sure you want to quit payment?"),
  };

  const updateTransaction = async (referenceId: string) => {
    console.log(new Date().getTime().toString());
    Transact.referenceId = referenceId;
    Transact.transactionId = transactId;
    try {
      const response = await customFetch(
        localStorage.getItem("accessToken")
      ).post("/orders/transactions", Transact);
      console.log("Transaction response--->>>", response);
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };
  return (
    <>
    <MyHeader current_tab={"Overview"}  />
    <div className="justify-center items-center bg-white mx-auto max-w-lg flex flex-col border-none px-8 rounded-2xl max-md:px-5 md:flex md:flex-col md:items-stretch container">
      <div className="justify-center items-stretch self-stretch bg-white flex w-full flex-col">
        <p className=" font-bold text-2xl">Payment Summary</p>
        <p className="mt-[2rem]">Item Name: {globalThis.itemName}</p>
        <p className="item-details__amount">Total fee: NGN {amount / 100}</p>
          <PaystackButton
            className="text-white text-l mt-8 font-semibold leading-5 whitespace-nowrap justify-center items-center bg-violet-500 px-5 py-3 rounded-3xl max-md:max-w-full hover:bg-violet-700"
            {...componentProps}
          />
      </div>
    </div>
    </>
  );
};

export default Paystack;
