import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import MyHeader from "../../layouts/Header/Header";
import axios, { AxiosError } from "axios";
import customFetch from "../../CustomFetch";
import { useForm } from "react-hook-form";

interface userDetails{
  firstName: '';
  lastName: '';
  email: '';
  address: '';
}

const NewAddres = {
  address: "",
}

function UserProfile(props: any) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userImage, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState<userDetails>();

  useEffect(() => {
    getUserProfile();
  }, []);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .post("/profile/update_address", NewAddres
        )
        .then((res) => {
          const data = res.data.responseMessage;
          console.log(data)
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const updatePicture = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data?.file[0]);
    console.log(userImage);
    try {
      const response = await axios
        .post("http://localhost:8085/api/v1/profile/picture", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          }
        })
        .then((res) => {
          const data = res.data.responseMessage;
          setImageUrl(data);
          console.log(data)
          localStorage.setItem("profilePic", data);
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get("/profile/user_details"
        )
        .then((res) => {
          const data = res.data.responseData;
          setUserDetails(data);
          console.log(data)
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
      <div className="container h-[100%] w-[50%] items-stretch rounded-3xl justify-items-center items-center justify-center">
        <div className="flex flex-col items-stretch w-full ml-[10%] mr-[10%] max-md:w-full max-md:ml-0 ">
          <div className="picBox">
            <form
              // encType="multipart/form-data"
              onSubmit={handleSubmit(updatePicture)}
            >
              <div className="profilePic mb-0 container">
                {(profilePicture || localStorage.getItem("profilePic")) && (
                  <img
                    src={profilePicture || localStorage.getItem("profilePic") || "https://cdn.builder.io/api/v1/image/assets/TEMP/02487d23-1063-4dbe-b3bf-f05c18e2bcbf?"}
                    alt="Profile"
                    className="rounded-5xl"
                  />
                )}
              </div>
              <input
                type="file"
                id="profilePicture"
                {...register("file")}
                accept="image/*"
                onChange={handlePictureChange}
                className="fileInput whitespace-normal"
              />

              <input type="submit" />
            </form>
          </div>
          <form className="flex flex-col w-full max-md:max-w-full max-md:mt-6 mt-[2rem]">
            <label
              htmlFor="firstname"
              className="text-black text-left text-base leading-5 capitalize whitespace-nowrap max-md:max-w-full"
            >
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              readOnly
              className="text-dark-500 text-xl leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-2 p-2 border-solid max-md:max-w-full"
              placeholder="Enter your firstname"
              value={userDetails?.firstName || ""}
            />
            <label
              htmlFor="lastname"
              className="text-black text-left text-base leading-5 capitalize whitespace-nowrap mt-4 max-md:max-w-full"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              readOnly
              className="text-dark-500 text-xlleading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-2 p-2 border-solid max-md:max-w-full"
              placeholder="Enter your lastname"
              value={userDetails?.lastName || ""}
            />
            <label
              htmlFor="email"
              className="text-black text-left text-base leading-5 capitalize whitespace-nowrap mt-4 max-md:max-w-full"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              readOnly
              className="text-dark-500 text-xl leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-2 p-2 border-solid max-md:max-w-full"
              placeholder="Enter your email"
              value={userDetails?.email || ""}
            />
            <label
              htmlFor="address"
              className="text-black text-left text-base leading-5 capitalize whitespace-nowrap mt-4 max-md:max-w-full"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="text-dark-500 text-sm leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-2 p-2 border-solid max-md:max-w-full"
              placeholder="Enter your street address"
              defaultValue={userDetails?.address || ""}
              onChange={(e)=> NewAddres.address = e.target.value}
            />

            <div className="flex flex-row gap-[20rem]">
              <button
                type="button"
                className="text-white text-base font-semibold leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-center border border-[color:var(--Log-Pri2,#EEE3FF)] bg-violet-700 mt-8 px-4 py-2 rounded-[100px] border-solid max-md:max-w-full max-md:mt-6 mb-8"
                onClick={handleSave}
              >
                Save Changes
              </button>

              <button
                type="button"
                className="text-white text-base font-semibold leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-center border border-[color:var(--Log-Pri2,#EEE3FF)] bg-gray mt-8 px-4 py-2 rounded-[100px] border-solid max-md:max-w-full max-md:mt-6 mb-8"
                onClick={() => navigate("/home")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
