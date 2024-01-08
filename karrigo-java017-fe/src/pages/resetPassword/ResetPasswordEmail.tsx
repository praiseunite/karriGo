import * as React from "react";

import { useState } from "react";
import { ErrorText } from "../../commons";
import axios, { AxiosError } from "axios";
import { Form, Input } from "antd";

function ResetPasswordPage(props: any) {
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:8085/api/v1/reset_password?email=" + email
      );

      console.log(response.data);
      alert("Reset link sent to your email.");
      // loginPage();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (
    <div className=" pr-14 max-md:pr-5 bg-sky-950	">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[55%] max-md:w-full max-md:ml-0 ">
          <img
            loading="lazy"
            src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700312154/ihcvgjuolphaonieuvjm.png"
            alt="backgroud"
            className="aspect-[0.7] object-fill  object-center w-full  overflow-hidden grow max-md:max-w-full max-md:mt-10"
          />
        </div>
        <div className="md:container md:mx-auto px-8 py-20 md:w-8/12 lg:w-5/12">
          <div className="items-center shadow-lg bg-white flex flex-col px-8 rounded-2xl max-md:px-5">
            <div className="justify-center items-stretch mt-7 self-center flex w-[191px] max-w-full gap-0 ">
              <div className="text-violet-700 text-6xl leading-[51px] tracking-wide">
                <span className="font-serif text-black">Karri</span>
                <span className="font-extrabold text-violet-700">GO</span>
              </div>
              <img
                loading="lazy"
                src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700600310/yjbfjmuoscsg6b094nxp.jpg"
                alt="Karrigo logo"
                className="object-contain object-center w-30 h-20 md:w-15 md:h-15 fill-violet-700 overflow-hidden shrink-0 max-w-full self-end md:flex md:flex-col items-stretch"
              />
            </div>
            <div className="text-gray-900 text-2xl font-bold leading-9 whitespace-nowrap mt-6">
              Reset your password{" "}
            </div>
            <div className="text-gray-400 text-l text-center whitespace-wrap mt-6">
              Enter your email below and we’ll send you instructions on how to
              reset your password.{" "}
            </div>
            <Form
              form={form}
              name="signup"
              scrollToFirstError
              onFinish={resetPassword}
              className="w-full max-w-lg"
            >
              <div className="mt-10">
                <ErrorText className="text-left ">{error}</ErrorText>
              </div>

              <div>
                <label
                  className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                  className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-violet-500 px-5 py-3 rounded-lg max-md:max-w-full hover:bg-violet-700"
                  type="button"
                  onClick={resetPassword}
                >
                  Send reset instructions
                </button>
              </div>
            </Form>
            <div className="text-violet-700 text-sm leading-5  self-center whitespace-nowrap mt-5 mb-5">
              <span className=" text-gray-400">Back to </span>
              <a
                href="/login"
                className="font-semibold text-violet-700 underline"
              >
                Sign in{"   "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
