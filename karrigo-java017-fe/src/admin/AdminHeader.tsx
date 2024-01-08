import { FunctionComponent, useState, useCallback, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import PortalPopup from "../layouts/Navbar/PortalPopup";
import { Link } from "react-router-dom";
import OptionsAd from "./navbar/OptionsAd";
import NotificationAd from "./navbar/NotificationAd";
import ModalAd from "./navbar/ModalAd";

interface Props{
  current_tab: string;
}

const AdminHeader = ({current_tab}:Props) => {
  const navigate = useNavigate();

  const home = () => {
    navigate("/admin/overview");
  };

  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const onMessageIconClick = useCallback(() => {
    // Please sync "Messages" to the project
  }, []);

  const openNotification = useCallback(() => {
    setNotificationOpen(true);
  }, []);

  const closeNotification = useCallback(() => {
    setNotificationOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <nav className="m-0 relative  max-w-full h-[200px] bg-white overflow-hidden text-left text-base text-main-text font-body-text-normal-16 sticky top-0 z-40">
      <header
        className="absolute top-[0px] left-[calc(50%_-_720px)] w-[1440px] flex flex-row items-center justify-between py-3 pr-[100px] pl-[50px] box-border text-left text-base text-black font-body-text-normal-16"
        id="header"
      >
        <div className="flex flex-row items-start justify-start ">
          <div className="flex flex-col items-center justify-start top-[0px]">
            <img
              className="relative w-28 h-25 mt-[-1rem]"
              id="logo"
              alt=""
              onClick={home}
              style={{ cursor: "pointer" }}
              src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700902029/spjuhathw6q8wkzwdj3y.png"
            />
            <div
              className="absolute mt-8 text-3xl  tracking-[0.01em]"
              onClick={home}
              style={{ cursor: "pointer" }}
            >
              <span>Karri</span>
              <span className="font-medium">GO</span>
            </div>
          </div>

          <div className="items-stretch border border-[color:var(--Log-Pri,#6926D7)] bg-white flex gap-2 pl-3 pr-20 py-2 rounded-2xl border-solid self-start max-md:pr-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d13b1382-6b74-4a90-911e-14eabb5ff60c?"
              className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
              alt="Search icon"
            />

            <Link
              to="/search"
              target="_blank"
              className="text-neutral-400 text-base leading-6 tracking-normal grow whitespace-nowrap bg-transparent border-none"
            >
              <input
                type="text"
                className="text-neutral-400 text-base leading-6 tracking-normal grow whitespace-nowrap outline-none border-none"
                placeholder="Search"
                style={{ color: "black" }}
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-row items-center justify-start mt-[-1.5rem] mr-[-5%] gap-[16px]">
          <img
            className="relative w-6 h-6 overflow-hidden shrink-0 cursor-pointer"
            alt=""
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc665078-fb48-4dd9-858f-f9aaef89f199?"
            onClick={onMessageIconClick}
          />
          <img
            className="relative w-7 h-7 cursor-pointer"
            alt=""
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f594fbef-3a74-41ab-81f8-76169b3baff3?"
            onClick={openNotification}
          />
          <img
            className="relative w-10 h-10 rounded-[30%] overflow-hidden shrink-0 cursor-pointer"
            alt=""
            src={
              (localStorage.getItem("profilePic")+"").length < 10 ?
              "https://cdn.builder.io/api/v1/image/assets/TEMP/02487d23-1063-4dbe-b3bf-f05c18e2bcbf?" : 
              localStorage.getItem("profilePic")+""
            }
            onClick={openModal}
          />
        </div>
      </header>
      <div className="absolute top-[50%] left-[2%] flex flex-row items-start mb-20 justify-start gap-[10px]">
        <OptionsAd current_tab={current_tab}/>
      </div>
      {isNotificationOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeNotification}
        >
          <NotificationAd />
        </PortalPopup>
      )}
      {isModalOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeModal}
        >
          <ModalAd />
        </PortalPopup>
      )}
    </nav>
  );
};

export default AdminHeader;
