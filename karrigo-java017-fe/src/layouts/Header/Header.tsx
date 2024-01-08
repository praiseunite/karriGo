import { FunctionComponent, useState, useCallback, useEffect } from "react";
import Notification1 from "../Navbar/Notification1";
import PortalPopup from "../Navbar/PortalPopup";
import Modal from "../Navbar/Modal";
import Options from "../Navbar/Options";
import { useNavigate } from "react-router-dom";

interface Props{
  current_tab: string;
}

const MyHeader = ({current_tab}:Props) => {
  const [trackingNum, setTrackingNum] = useState("");
  const navigate = useNavigate();

  const home = () => {
    navigate("/home")
  }

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

    const searchOrder = () => {
      globalThis.trackingNum = trackingNum;
      navigate("/find_track")
      console.log("Tracking number: ",trackingNum);
    }

       
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
                style={{ cursor: 'pointer' }}
                src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700902029/spjuhathw6q8wkzwdj3y.png"
              />
              <div className="absolute mt-8 text-3xl  tracking-[0.01em]" onClick={home} style={{ cursor: 'pointer' }}>
                <span>Karri</span>
                <span className="font-medium">GO</span>
              </div>
            </div>

            <form>
              <div className="items-stretch border border-[color:var(--Log-Pri,#6926D7)] bg-white flex gap-2 pl-3 pr-1 py-0 rounded-2xl border-solid self-start max-md:pr-5 ml-[2rem] mt-[1rem]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d13b1382-6b74-4a90-911e-14eabb5ff60c?"
                  className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full mt-[0.5rem]"
                  alt="Search icon"
                />
                <input
                  type="text"
                  className="text-neutral-400 text-base leading-6 tracking-normal grow whitespace-nowrap outline-none border-none"
                  style={{ color: "black" }}
                  onChange={(e)=> setTrackingNum(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-left items-left bg-violet-500 px-5 py-2 rounded-2xl max-md:max-w-full hover:bg-violet-700 mr-[-2%]"
                  onClick={searchOrder}
                >Search</button>
              </div>
            </form>
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
              src={(localStorage.getItem("profilePic")+"").length < 10 ?
              "https://cdn.builder.io/api/v1/image/assets/TEMP/02487d23-1063-4dbe-b3bf-f05c18e2bcbf?" : 
              localStorage.getItem("profilePic")+""}
              onClick={openModal}
            />
          </div>
        </header>
        <div className="absolute top-[50%] left-[2%] flex flex-row items-start mb-20 justify-start gap-[10px]">
          <Options current_tab={current_tab} />
        </div>
        {isNotificationOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeNotification}
        >
          <Notification1 />
        </PortalPopup>
      )}
      {isModalOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeModal}
        >
          <Modal />
        </PortalPopup>
      )}
      </nav>
    );
};

export default MyHeader;