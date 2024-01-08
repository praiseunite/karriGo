import * as React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorText } from "../commons";
import axios, { AxiosError } from "axios";
import { DatePickerProps, Checkbox, Form, Input } from "antd";
import { DatePicker } from "antd";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const Customer = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  address: "",
  gender: "",
  dob: "",
};

const googleMapsApiKey: string = process.env
  .REACT_APP_GOOGLE_MAPS_API_KEY as string;
const libraries: any = ["drawing", "places"];

function SignupPage(props: any) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDob(dateString);
    console.log(date, dateString);
  };

  const loginPage = () => {
    navigate("/login");
  };

  const saveUser = async () => {
    Customer.firstName = firstName;
    Customer.lastName = lastName;
    Customer.email = email;
    Customer.password = password;
    Customer.confirmPassword = confirmPassword;
    Customer.address = address;
    Customer.phoneNumber = phoneNumber;
    Customer.gender = gender;
    Customer.dob = dob;

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8085/api/v1/users/signup",
        Customer
      );

      console.log(response.data);
      alert("Email verification has been sent to "+email+".")

      // Rederict to login page on successful signup
      loginPage();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (
    <div className=" bg-sky-950">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[55%] max-md:w-full max-md:ml-0 ">
          <img
            loading="lazy"
            src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700312154/ihcvgjuolphaonieuvjm.png"
            alt="backgroud"
            className="aspect-[0.7] object-fill  object-center w-full  overflow-hidden grow max-md:max-w-full"
          />
        </div>
        <div className="md:container md:mx-auto px-8 py-20 md:w-8/12 lg:w-5/12">
          <div className="items-center shadow-lg bg-white flex flex-col px-8 rounded-2xl max-md:px-5">
            <div className="justify-center items-stretch mt-7 self-center flex w-[100px] max-w-full gap-0 ">
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
            <div className="text-gray-900 text-lg font-bold leading-9 whitespace-nowrap md:whitespace-normal mt-1">
              Create a new account{" "}
            </div>
            <Form
              form={form}
              name="signup"
              scrollToFirstError
              onFinish={saveUser}
              className="md:w-full md:flex md:flex-col md:items-stretch"
              autoComplete="off"
            >
              <div className="mt-7">
                <ErrorText className="text-left ">{error}</ErrorText>
                <label
                  className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <Form.Item
                  name="firstName"
                  // className="w-full px-3 mb-1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your First name!",
                    },
                  ]}
                >
                  <Input
                    // type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div>
                <label
                  className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2 mt-1"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <Form.Item
                  name="lastName"
                  // className="w-full px-3 mb-1"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Last name!",
                    },
                  ]}
                >
                  <Input
                    // type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                    id="grid-last-name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Item>
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

                <label
                  className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    () => ({
                      validator(_, value) {
                        if ((value).toString().length >= 4) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Password is too short!"
                          )
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    className="py-3 w-full px-3 "
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <label
                  className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-confirm-password"
                >
                  Confirm Password
                </label>

                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    className="py-3 w-full px-3 border-solid"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6 ">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="addresss"
                    type="text"
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-phone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone"
                    type="tel"
                    placeholder="080********"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-gender"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-gender"
                      placeholder="Select your gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-date"
                  >
                    Date of Birth
                  </label>
                  <div>
                    <DatePicker
                      className="w-full md:w-9/8 px-3 py-2.5 bg-gray-200 border border-gray-200"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full max-w-lg">
                <Form.Item
                  name=""
                  valuePropName="checked"
                  className="w-full max-w-lg"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    I have read the{" "}
                    <a href="https://karrigo.com/agreement">agreement</a>
                  </Checkbox>
                </Form.Item>
              </div>
              <div className="items-stretch self-stretch flex flex-col my-4 max-md:max-w-full">
                <button
                  className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-violet-500 px-5 py-3 rounded-lg max-md:max-w-full hover:bg-violet-700"
                  type="button"
                  onClick={saveUser}
                >
                  Sign Up
                </button>
              </div>
              
            </Form>
            <div className="text-sm leading-5  self-center whitespace-normal mt-5 mb-5 md:flex md:flex-col items-stretch">
              <span className=" text-gray-400">Already have an account ? </span>
              <a
                href="/login"
                className="font-semibold text-violet-700 underline"
              >
                Sign in here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
