// import * as React from "react";
import React, { useState } from "react";
import MyHeader from "../layouts/Header/Header";
import { Input, Form } from "antd";
import { AxiosError } from "axios";
import customFetch from "../CustomFetch";
import { ErrorText } from "../commons";

const UpdatePassword = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
}

function UserChangePassword(props: any) {
  const [form] = Form.useForm();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const updatePassword = async () => {
    UpdatePassword.oldPassword = oldPassword;
    UpdatePassword.newPassword = password;
    UpdatePassword.confirmNewPassword = confirmPassword;
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .post("/profile/update_password", UpdatePassword
        )
        .then((res) => {
          const data = res.data.responseMessage;
          console.log(data)
          alert("Password has been changed successfully!")
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (
    <>
      <MyHeader current_tab={"Overview"} />
      <div className="justify-items-center items-center justify-center container h-[100%] w-[50%]  flex flex-col items-stretch rounded-3xl">
        <div className=" ml-5 max-md:w-full max-md:ml-0 bg-gray-100 ">
          <Form
            form={form}
            name="signup"
            scrollToFirstError
            onFinish={updatePassword}
            autoComplete="off"
            className="items-stretch flex flex-col mt-6 max-md:max-w-full p-20 max-md:mt-10"
          >
            <ErrorText className="text-left ">{error}</ErrorText>
            <label
              className="block uppercase text-left w-full tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>

            <Form.Item
              name="oldPassword"
              id="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                () => ({
                  validator(_, value) {
                    if (value.toString().length >= 4) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Password is too short!"));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                className="py-3 w-full px-3 "
                onChange={(e) => setOldPassword(e.target.value)}
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
                    if (value.toString().length >= 4) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Password is too short!"));
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

            <button
              type="button"
              className="text-white text-base font-semibold leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-center border border-[color:var(--Log-Pri2,#EEE3FF)] bg-violet-700 mt-12 px-5 py-3 rounded-[100px] border-solid max-md:max-w-full max-md:mt-10"
              onClick={updatePassword}
            >
              Save Changes
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default UserChangePassword;
