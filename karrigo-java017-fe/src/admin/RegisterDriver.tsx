import * as React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePickerProps, Form, Input } from "antd";
import { DatePicker } from "antd";
import customFetch from "../CustomFetch";
import { ErrorText } from "../commons";
import {AxiosError} from "axios";
import AdminHeader from "./AdminHeader";

const Customer = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  gender: "",
  dob: "",
};

function RegisterDriver (props: any) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDob(dateString);
    console.log(date, dateString);
  };



  const saveUser = async () => {
    Customer.firstName = firstName;
    Customer.lastName = lastName;
    Customer.email = email;
    Customer.address = address;
    Customer.phoneNumber = phoneNumber;
    Customer.gender = gender;
    Customer.dob = dob;

    setError("");

    const token = localStorage.getItem("accessToken") || "";

    try {
      const response = await customFetch(token).post(
        "/drivers/signup",
        Customer
      );

      console.log(response.data);
      alert("Email verification sent to driver email "+email+".")
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (

     <div >

      <div>
        <AdminHeader current_tab={"Overview"} />
      </div>


        <div className="md:container md:mx-auto px-8 py-15 md:w-8/12 lg:w-5/12">

          <div className=" text-2xl font-bold leading-9 whitespace-nowrap md:whitespace-normal mt-6">
            Register Driver{" "}
          </div>
          <Form
              form={form}
              name="signup"
              scrollToFirstError
              onFinish={saveUser}
              className="md:w-full md:flex md:flex-col md:items-stretch"
          >
            <div className="mt-10">
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
                    placeholder="Your first name"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
            </div>

            <div>
              <label
                  className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
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
                    placeholder="Your last name"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
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
                    placeholder="Your email"
                    type="email"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                    id="grid-email"
                    onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </div>



            <div>
              <label
                  className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-address"
              >
                Address
              </label>
              <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-address"
                  type="text"
                  placeholder="Your address"
                  onChange={(e) => setAddress(e.target.value)}
              />
            </div>


            <div>
              <label
                  className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2 mt-6"
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



            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mt-6 md:mb-0 relative">
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


              <div className="w-full md:w-1/2 px-3 mt-6">
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



            <div className="items-stretch self-stretch flex flex-col my-8 max-md:max-w-full">
              <button
                  className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-violet-500 px-5 py-3 rounded-lg max-md:max-w-full hover:bg-violet-700"
                  type="button"
                  onClick={saveUser}
              >
                Register
              </button>
            </div>
          </Form>
          </div>
        </div>
  );
}
export default RegisterDriver;
