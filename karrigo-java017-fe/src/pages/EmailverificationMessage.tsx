import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios, { AxiosError } from "axios";
import { Form, Input } from "antd";

function EmailverificationMessage() {
  const [form] = Form.useForm();
  const queryParameters = new URLSearchParams(window.location.search);
  const verificationToken = queryParameters.get("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);

  function closeModal1() {
    setIsOpen1(false);
    // loginPage();
  }

  function closeModal2() {
    setIsOpen2(false);
    reSendLink();
  }

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    setIsOpen1(false);
    setIsOpen2(false);
    try {
      const response = await axios.get(
        "http://localhost:8085/api/v1/registration/email_verification?token=" +
          verificationToken
      );

      const res = response.data.responseData || "";

      console.log(res);
      setIsOpen1(true);
    } catch (err) {
      setIsOpen2(true);
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  // const loginPage = () => {
  //   navigate("/login");
  // };

  const reSendLink = async () => {
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:8085/api/v1/registration/re_verification?email=" +
          email
      );

      console.log(response.data);
      alert("Verification link sent to your email.");
      // Rederict to home page on successful login
      // closeModal2();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen1}
        ariaHideApp={false}
        className={"w-full bg-transparent border-none border-white"}
      >
        <div className="justify-center items-center bg-white mx-auto max-w-lg flex flex-col border-none px-8 rounded-2xl max-md:px-5 md:flex md:flex-col md:items-stretch">
          <div className="text-violet-700 text-2xl justify-center items-center font-medium  mt-8 max-md:max-w-full">
            <h3 className="m-0  text-inherit leading-[32px] text-center justify-center items-center font-medium font-inherit">
              Your email has been successfully verified!
            </h3>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4523a54-82ba-46e3-a403-e18afb590c04?"
            className="aspect-square object-contain object-center w-20 overflow-hidden self-center max-w-full mt-8"
          />
          <div className=" text-base leading-[22px] font-medium text-gray-3 text-center inline-block w-[480px] max-md:max-w-full">
            Go back and login.
          </div>
          <div className="items-stretch self-stretch flex flex-col my-8 max-md:max-w-full">
            <button
              className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-violet-500 px-5 py-3 rounded-3xl max-md:max-w-full hover:bg-violet-700"
              type="button"
              onClick={closeModal1}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        ariaHideApp={false}
        className={"w-full bg-transparent border-none border-white"}
      >
        <div className="justify-center items-center bg-white mx-auto max-w-lg flex flex-col px-8 rounded-2xl max-md:px-5 md:flex md:flex-col md:items-stretch">
          <div className="text-red-700 text-2xl justify-center items-center font-medium  mt-8 max-md:max-w-full">
            <h3 className="m-0  text-inherit leading-[32px] text-center justify-center items-center font-medium font-inherit">
              Email verification failed. Token has expired!
            </h3>
          </div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700577257/khqjna0apsztzacyzubs.svg"
            className="aspect-square object-contain object-center w-20 overflow-hidden self-center max-w-full mt-8"
          />
          <div className=" text-base leading-[22px] font-medium text-gray-3 text-center inline-block w-[480px] mt-4 max-md:max-w-full">
            Enter your email below to get a new email verification link.{" "}
          </div>
          <Form
            form={form}
            name="signup"
            scrollToFirstError
            onFinish={reSendLink}
            className="w-full max-w-lg"
          >
            <div>
              <label
                className="block uppercase text-left mt-4 w-full tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <Form.Item
                name="email"
                // className="w-full px-3 mb-1"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                  id="grid-email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="items-stretch self-stretch flex flex-col my-8 max-md:max-w-full">
              <button
                className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-violet-500 px-5 py-3 rounded-3xl max-md:max-w-full hover:bg-violet-700"
                type="button"
                onClick={reSendLink}
              >
                Continue
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default EmailverificationMessage;
