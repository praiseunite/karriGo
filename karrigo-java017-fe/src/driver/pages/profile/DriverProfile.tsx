import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverProfile.css";
import DriverModal from "../../layout/navbar/DriverModal";
import DriverHeader from "../../layout/header/DriverHeader";

function DriverProfile(props: any) {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitClick = async () => {
    navigate("History1");
  };

  const [activeButton, setActiveButton] = React.useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };

  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleSave = () => {
    console.log("Save button clicked!");
  };

  return (
    <>
      <DriverHeader current_tab={"Overview"} />
      <div className="container h-[100%] w-[50%] items-stretch rounded-3xl justify-items-center items-center justify-center">
          <div className="flex flex-col items-stretch w-full ml-[10%] mr-[10%] max-md:w-full max-md:ml-0 ">
            <div className="picBox">
            <div className="profilePic mb-0 container">
              {profilePicture && (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="rounded-5xl"
                />
              )}
            </div>
            <div>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handlePictureChange}
                className="fileInput whitespace-normal"
              />
            </div>
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
                className="text-zinc-500 text-sm leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-2 p-2 border-solid max-md:max-w-full"
                placeholder="Enter your firstname"
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
                className="text-zinc-500 text-sm leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-2 p-2 border-solid max-md:max-w-full"
                placeholder="Enter your lastname"
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
                className="text-zinc-500 text-sm leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-2 p-2 border-solid max-md:max-w-full"
                placeholder="Enter your email"
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
                className="text-zinc-500 text-sm leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-2 p-2 border-solid max-md:max-w-full"
                placeholder="Enter your street address"
              />
             
              <div className="flex flex-row gap-[20rem]">
              <button
                type="submit"
                className="text-white text-base font-semibold leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-center border border-[color:var(--Log-Pri2,#EEE3FF)] bg-violet-700 mt-8 px-4 py-2 rounded-[100px] border-solid max-md:max-w-full max-md:mt-6 mb-8"
                onClick={handleSave}
              >
                Save Changes
              </button>

              <button
                type="submit"
                className="text-white text-base font-semibold leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-center border border-[color:var(--Log-Pri2,#EEE3FF)] bg-gray mt-8 px-4 py-2 rounded-[100px] border-solid max-md:max-w-full max-md:mt-6 mb-8"
                onClick={()=> navigate("/driver/home")}
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
export default DriverProfile;
