// import * as React from "react";
import React, { useState } from 'react';
import DriverHeader from '../layout/header/DriverHeader';

function DriverChangePassword(props: any) {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOverviewClick = () => {
    // Handle the click action for Overview button
    console.log("Overview button clicked");
    // Perform any other actions needed when the Overview button is clicked
  };

  const handleHistoryClick = () => {
    // Handle the click action for History button
    console.log("History button clicked");
    // Perform any other actions needed when the History button is clicked
  };

  const handleFindTrackClick = () => {
    // Handle the click action for Find track button
    console.log("Find track button clicked");
    // Perform any other actions needed when the Find track button is clicked
  };

  const [activeButton, setActiveButton] = React.useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };

  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    
<>
        <DriverHeader current_tab={'Overview'} />
        <div className='justify-items-center items-center justify-center container h-[100%] w-[50%]  flex flex-col items-stretch rounded-3xl'>
          <div className=" ml-5 max-md:w-full max-md:ml-0 bg-gray-100 ">
            <form className="items-stretch flex flex-col mt-6 max-md:max-w-full p-20 max-md:mt-10">

              <label htmlFor="oldPassword" className="text-left text-black font-bold text-base leading-5 capitalize whitespace-nowrap mt-1 max-md:max-w-full">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="text-zinc-500 text-sm leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-3 p-2.5 border-solid max-md:max-w-full"
                placeholder="Enter your old password"
              />

              <label htmlFor="password" className="text-left text-black font-bold text-base leading-5 capitalize whitespace-nowrap mt-6 max-md:max-w-full">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-zinc-500 text-sm leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-3 p-2.5 border-solid max-md:max-w-full"
                placeholder="Enter your password"
              />

              <label htmlFor="confirmPassword" className="text-left text-black font-bold text-base leading-5 capitalize whitespace-nowrap mt-6 max-md:max-w-full">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-zinc-500 text-sm leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-3 p-2.5 border-solid max-md:max-w-full"
                placeholder="Confirm your password"
              />

              <button
                type="submit"
                className="text-white text-base font-semibold leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-center border border-[color:var(--Log-Pri2,#EEE3FF)] bg-violet-700 mt-12 px-5 py-3 rounded-[100px] border-solid max-md:max-w-full max-md:mt-10"
              >
                Save Changes
              </button>
            </form>
          </div>
          </div>
          </>
  );
}

export default DriverChangePassword;
