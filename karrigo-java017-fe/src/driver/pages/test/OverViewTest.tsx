import { FunctionComponent, useState, useCallback } from "react";
import Notification1 from "../../../layouts/Navbar/Notification1";
import PortalPopup from "../../../layouts/Navbar/PortalPopup";
import Modal from "../../../layouts/Navbar/Modal";
import Frame from "../../components/Frame";

const OverviewTest: FunctionComponent = () => {
  const [isNotificationDriverOpen, setNotificationDriverOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFrameOpen, setFrameOpen] = useState(false);

  const onMessageIconClick = useCallback(() => {
    // Please sync "Messages" to the project
  }, []);

  const openNotificationDriver = useCallback(() => {
    setNotificationDriverOpen(true);
  }, []);

  const closeNotificationDriver = useCallback(() => {
    setNotificationDriverOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const onFrameContainer5Click = useCallback(() => {
    // Please sync "Overview" to the project
  }, []);

  const onFrameContainer7Click = useCallback(() => {
    // Please sync "Find Track" to the project
  }, []);

  const openFrame = useCallback(() => {
    setFrameOpen(true);
  }, []);

  const closeFrame = useCallback(() => {
    setFrameOpen(false);
  }, []);

  return (
    <>
      <div className="relative bg-white w-full h-[1024px] overflow-hidden text-left text-base text-black font-body-textmedium-16">
        <div className="absolute top-[0px] left-[calc(50%_-_720px)] w-[1440px] flex flex-row items-center justify-between py-3 pr-[100px] pl-[50px] box-border">
          <div className="flex flex-row items-start justify-start gap-[50px]">
            <div className="flex flex-col items-center justify-start">
              <img className="relative w-12 h-6" alt="" src="/vector.svg" />
              <div className="relative tracking-[0.01em]">
                <span>Kari</span>
                <span className="font-medium">GO</span>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start text-gray60">
              <div className="rounded-2xl bg-white box-border w-[284px] flex flex-row items-center justify-start py-2 px-3 gap-[8px] border-[1px] border-solid border-log-pri">
                <img className="relative w-6 h-6" alt="" src="/search.svg" />
                <div className="flex-1 flex flex-row items-center justify-start gap-[4px]">
                  <div className="relative tracking-[-0.01em] leading-[24px]">
                    Search
                  </div>
                  <img
                    className="relative w-0 h-[19.02px] hidden"
                    alt=""
                    src="/caret.svg"
                  />
                </div>
                <img
                  className="relative w-4 h-4 hidden"
                  alt=""
                  src="/close.svg"
                />
                <img
                  className="relative w-4 h-4 hidden"
                  alt=""
                  src="/filter.svg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[16px]">
            <img
              className="relative w-8 h-8 overflow-hidden shrink-0 cursor-pointer"
              alt=""
              src="/message.svg"
              onClick={onMessageIconClick}
            />
            <img
              className="relative w-9 h-9 cursor-pointer"
              alt=""
              src="/frame-27.svg"
              onClick={openNotificationDriver}
            />
            <img
              className="relative w-8 h-8 overflow-hidden shrink-0 cursor-pointer"
              alt=""
              src="/profile.svg"
              onClick={openModal}
            />
          </div>
        </div>
        <div className="absolute top-[88px] left-[42px] flex flex-row items-start justify-start gap-[10px] text-main-text">
          <div className="rounded-2xl bg-log-pri flex flex-row items-center justify-center py-1 px-6 text-white">
            <div className="relative tracking-[-0.01em] leading-[24px] font-semibold">
              Overview
            </div>
          </div>
          <div
            className="rounded-2xl flex flex-row items-center justify-center py-1 px-6 cursor-pointer"
            onClick={onFrameContainer5Click}
          >
            <div className="relative tracking-[-0.01em] leading-[24px]">
              History
            </div>
          </div>
          <div className="rounded-2xl hidden flex-row items-center justify-center py-1 px-6">
            <div className="relative tracking-[-0.01em] leading-[24px]">
              Calculator
            </div>
          </div>
          <div
            className="rounded-2xl flex flex-row items-center justify-center py-1 px-6 cursor-pointer"
            onClick={onFrameContainer7Click}
          >
            <div className="relative tracking-[-0.01em] leading-[24px]">
              Find track
            </div>
          </div>
        </div>
        <section className="absolute top-[152px] left-[34px] flex flex-row items-start justify-start gap-[32px] text-left text-base text-black font-body-textmedium-16">
          <div className="rounded-xl bg-white box-border w-80 flex flex-col items-start justify-center p-4 gap-[12px] border-[1px] border-solid border-grey-200">
            <div className="self-stretch flex flex-row items-start justify-between">
              <div className="flex flex-row items-start justify-start gap-[8px]">
                <div className="relative tracking-[0.15px] leading-[140%]">
                  Order ID:
                </div>
                <div className="flex flex-row items-start justify-start">
                  <div className="relative tracking-[0.15px] leading-[140%] font-medium">
                    #234678
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[8px] text-sm text-green-2">
                <div className="h-[22px] flex flex-row items-center justify-start">
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-2.5 h-2.5"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative leading-[19px]">Delivery</div>
                  </div>
                </div>
                <div onClick={openFrame}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_54_3005)">
                      <path
                        d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                        fill="#323232"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_54_3005">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {/* <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/more-vert.svg"
                /> */}
              </div>
            </div>
            <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray-200" />
            <div className="flex flex-row items-center justify-start gap-[24px] text-xs text-red">
              <div className="flex flex-col items-center justify-start">
                <div className="relative rounded-[50%] bg-red w-2.5 h-2.5" />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative box-border w-px h-[61px] border-r-[1px] border-dashed border-red" />
                  <div className="relative box-border w-px h-12 border-r-[1px] border-dashed border-green-2" />
                </div>
                <div className="relative rounded-[50%] box-border w-2.5 h-2.5 border-[2px] border-solid border-green-2" />
              </div>
              <div className="flex flex-col items-start justify-start gap-[32px]">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                  <div className="relative leading-[19px] uppercase font-medium">
                    SENDER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      Adebisi Olufemi
                    </div>
                    <div className="relative text-sm leading-[19px]">{`32,Rasaq-Eletu, Osapa-London `}</div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[8px] text-green-2">
                  <div className="relative leading-[19px] uppercase font-medium">
                    RECEIVER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      Adeola Papa
                    </div>
                    <div className="relative text-sm leading-[19px]">{`32,Rasaq-Eletu, Osapa-London `}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray-200" />
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative rounded-[50%] w-[50px] h-[50px] object-cover"
                  alt=""
                  src="/ellipse-6@2x.png"
                />
                <div className="flex flex-col items-start justify-start gap-[2px]">
                  <div className="relative tracking-[0.15px] leading-[140%] font-semibold">
                    Daniel Olu
                  </div>
                  <div className="relative text-sm tracking-[0.15px] leading-[140%] font-light text-grey-500">
                    Client
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-lavender flex flex-row items-center justify-start py-2 px-[18px]">
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/message1.svg"
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white box-border w-80 flex flex-col items-start justify-start p-4 gap-[12px] border-[1px] border-solid border-grey-200">
            <div className="self-stretch flex flex-row items-start justify-between">
              <div className="flex flex-row items-start justify-start gap-[8px]">
                <div className="relative tracking-[0.15px] leading-[140%]">
                  Order ID:
                </div>
                <div className="flex flex-row items-start justify-start">
                  <div className="relative tracking-[0.15px] leading-[140%] font-medium">
                    #234678
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[8px] text-sm text-red">
                <div className="self-stretch flex flex-row items-center justify-start">
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-2.5 h-2.5"
                      alt=""
                      src="/ellipse-11.svg"
                    />
                    <div className="relative leading-[19px]">Transfer</div>
                  </div>
                </div>
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/more-vert1.svg"
                />
              </div>
            </div>
            <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray-200" />
            <div className="flex flex-row items-center justify-start gap-[24px] text-xs text-red">
              <div className="flex flex-col items-center justify-start">
                <div className="relative rounded-[50%] bg-red w-2.5 h-2.5" />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative box-border w-px h-[61px] border-r-[1px] border-dashed border-red" />
                  <div className="relative box-border w-px h-12 border-r-[1px] border-dashed border-green-2" />
                </div>
                <div className="relative rounded-[50%] box-border w-2.5 h-2.5 border-[2px] border-solid border-green-2" />
              </div>
              <div className="flex flex-col items-start justify-start gap-[32px]">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                  <div className="relative leading-[19px] uppercase font-medium">
                    SENDER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      Adebisi Olufemi
                    </div>
                    <div className="relative text-sm leading-[19px]">{`32,Rasaq-Eletu, Osapa-London `}</div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[8px] text-green-2">
                  <div className="relative leading-[19px] uppercase font-medium">
                    RECEIVER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      Adeola Papa
                    </div>
                    <div className="relative text-sm leading-[19px]">{`32,Rasaq-Eletu, Osapa-London `}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray-200" />
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative rounded-[50%] w-[50px] h-[50px] object-cover"
                  alt=""
                  src="/ellipse-61@2x.png"
                />
                <div className="flex flex-col items-start justify-start gap-[2px]">
                  <div className="relative tracking-[0.15px] leading-[140%] font-semibold">
                    Daniel Olu
                  </div>
                  <div className="relative text-sm tracking-[0.15px] leading-[140%] font-light text-grey-500">
                    Client
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-lavender flex flex-row items-center justify-start py-2 px-[18px]">
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/message2.svg"
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white box-border w-80 flex flex-col items-start justify-start p-4 gap-[12px] border-[1px] border-solid border-grey-200">
            <div className="self-stretch flex flex-row items-start justify-between">
              <div className="flex flex-row items-start justify-start gap-[8px]">
                <div className="relative tracking-[0.15px] leading-[140%]">
                  Order ID:
                </div>
                <div className="flex flex-row items-start justify-start">
                  <div className="relative tracking-[0.15px] leading-[140%] font-medium">
                    #234678
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[8px] text-sm text-yellow">
                <div className="self-stretch flex flex-row items-center justify-start">
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-2.5 h-2.5"
                      alt=""
                      src="/ellipse-12.svg"
                    />
                    <div className="relative leading-[19px]">Pick-Up</div>
                  </div>
                </div>
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/more-vert2.svg"
                />
              </div>
            </div>
            <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray-200" />
            <div className="flex flex-row items-center justify-start gap-[24px] text-xs text-red">
              <div className="flex flex-col items-center justify-start">
                <div className="relative rounded-[50%] bg-red w-2.5 h-2.5" />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative box-border w-px h-[61px] border-r-[1px] border-dashed border-red" />
                  <div className="relative box-border w-px h-12 border-r-[1px] border-dashed border-green-2" />
                </div>
                <div className="relative rounded-[50%] box-border w-2.5 h-2.5 border-[2px] border-solid border-green-2" />
              </div>
              <div className="flex flex-col items-start justify-start gap-[32px]">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                  <div className="relative leading-[19px] uppercase font-medium">
                    SENDER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      Adebisi Olufemi
                    </div>
                    <div className="relative text-sm leading-[19px]">{`32,Rasaq-Eletu, Osapa-London `}</div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[8px] text-green-2">
                  <div className="relative leading-[19px] uppercase font-medium">
                    RECEIVER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      Adeola Papa
                    </div>
                    <div className="relative text-sm leading-[19px]">{`32,Rasaq-Eletu, Osapa-London `}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray-200" />
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative rounded-[50%] w-[50px] h-[50px] object-cover"
                  alt=""
                  src="/ellipse-62@2x.png"
                />
                <div className="flex flex-col items-start justify-start gap-[2px]">
                  <div className="relative tracking-[0.15px] leading-[140%] font-semibold">
                    Daniel Olu
                  </div>
                  <div className="relative text-sm tracking-[0.15px] leading-[140%] font-light text-grey-500">
                    Client
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-lavender flex flex-row items-center justify-start py-2 px-[18px]">
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/message3.svg"
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white box-border w-80 flex flex-col items-start justify-start p-4 gap-[12px] border-[1px] border-solid border-grey-200">
            <div className="self-stretch flex flex-row items-start justify-between">
              <div className="flex flex-row items-start justify-start gap-[8px]">
                <div className="relative tracking-[0.15px] leading-[140%]">
                  Order ID:
                </div>
                <div className="flex flex-row items-start justify-start">
                  <div className="relative tracking-[0.15px] leading-[140%] font-medium">
                    #234678
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[8px] text-sm text-red">
                <div className="self-stretch flex flex-row items-center justify-start">
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-2.5 h-2.5"
                      alt=""
                      src="/ellipse-13.svg"
                    />
                    <div className="relative leading-[19px]">Transfer</div>
                  </div>
                </div>
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0 cursor-pointer"
                  alt=""
                  src="/more-vert3.svg"
                  onClick={openFrame}
                />
              </div>
            </div>
            <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray-200" />
            <div className="flex flex-row items-center justify-start gap-[24px] text-xs text-red">
              <div className="flex flex-col items-center justify-start">
                <div className="relative rounded-[50%] bg-red w-2.5 h-2.5" />
                <div className="flex flex-col items-start justify-start">
                  <div className="relative box-border w-px h-[61px] border-r-[1px] border-dashed border-red" />
                  <div className="relative box-border w-px h-12 border-r-[1px] border-dashed border-green-2" />
                </div>
                <div className="relative rounded-[50%] box-border w-2.5 h-2.5 border-[2px] border-solid border-green-2" />
              </div>
              <div className="flex flex-col items-start justify-start gap-[32px]">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                  <div className="relative leading-[19px] uppercase font-medium">
                    SENDER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      Adebisi Olufemi
                    </div>
                    <div className="relative text-sm leading-[19px]">{`32,Rasaq-Eletu, Osapa-London `}</div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-[8px] text-green-2">
                  <div className="relative leading-[19px] uppercase font-medium">
                    RECEIVER
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                    <div className="relative leading-[19px] font-medium">
                      Adeola Papa
                    </div>
                    <div className="relative text-sm leading-[19px]">{`32,Rasaq-Eletu, Osapa-London `}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray-200" />
            <div className="self-stretch flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="relative rounded-[50%] w-[50px] h-[50px] object-cover"
                  alt=""
                  src="/ellipse-63@2x.png"
                />
                <div className="flex flex-col items-start justify-start gap-[2px]">
                  <div className="relative tracking-[0.15px] leading-[140%] font-semibold">
                    Daniel Olu
                  </div>
                  <div className="relative text-sm tracking-[0.15px] leading-[140%] font-light text-grey-500">
                    Client
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-lavender flex flex-row items-center justify-start py-2 px-[18px]">
                <img
                  className="relative w-4 h-4 overflow-hidden shrink-0"
                  alt=""
                  src="/message4.svg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {isNotificationDriverOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeNotificationDriver}
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
      {isFrameOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeFrame}
        >
          <Frame taskId={0}/>
        </PortalPopup>
      )}
    </>
  );
};

export default OverviewTest;
