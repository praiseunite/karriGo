// Import necessary libraries and components
import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import DropdownMenu from "./DropdownMenu";
import PortalPopup from "./PortalPopup";

interface LastestOrder {
  orderId: number;
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  trackingNum: string;
  imageURL: string;
  orderStatus: string;
  // deliveryStatus: DeliveryStatus;
  // driverInfo: DriverInfo;
}

const OrderFormContainer = ({
  orderId,
  senderName,
  senderAddress,
  receiverName,
  receiverAddress,
  trackingNum,
  imageURL,
  orderStatus
}: LastestOrder) => {
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const openDropdownMenu = useCallback(() => {
    setDropdownMenuOpen(true);
  }, []);

  const closeDropdownMenu = useCallback(() => {
    setDropdownMenuOpen(false);
  }, []);

  const handleMessageClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.stopPropagation();
    console.log("Message button clicked!");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isClicked &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setClicked(false);
        closeDropdownMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isClicked, closeDropdownMenu]);

  return (
    <>
      <div
      key={orderId}
        className={`rounded-xl box-border w-[400px] flex flex-col items-start justify-center p-3 gap-[12px] text-right text-base text-black font-body-text-normal-16 border-[1px] border-solid border-grey-200 cursor-pointer ${
          isClicked ? "bg-purple-500" : ""
        } order-form-container`}
      >
        <div className="self-stretch flex flex-row items-center justify-between">
          <div className="w-[100%] flex flex-row items-start justify-between">
            <div className="relative text-sm tracking-[0.15px] leading-[140%] ">
              ID:
            </div>
            <div className="flex flex-row items-start justify-start">
              <div className="relative tracking-[0.15px] leading-[140%] font-medium text-xs ">
                {trackingNum}
              </div>
            </div>
            <div className="flex flex-row items-start justify-start">
              <div className={`relative tracking-[0.15px] leading-[140%] font-medium text-sm ${orderStatus === "PENDING" ? "text-red" : "text-green-500"} `}>
                {orderStatus}
              </div>
            </div>
          </div>
          <div onClick={openDropdownMenu} className="cursor-pointer">
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
        </div>
        <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray1-200" />
        <div className="flex flex-row items-center justify-start gap-[24px] text-left text-xs text-red">
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
                  {senderName}
                </div>
                <div className="relative text-sm leading-[19px]">
                  {senderAddress}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[8px] text-green-2">
              <div className="relative leading-[19px] uppercase font-medium">
                RECEIVER
              </div>
              <div className="flex flex-col items-start justify-start gap-[4px] text-base text-black">
                <div className="relative leading-[19px] font-medium">
                  {receiverName}
                </div>
                <div className="relative text-sm leading-[19px]">
                  {receiverAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch relative box-border h-0.5 opacity-[0.64] border-t-[2px] border-solid border-gray1-200" />
        <div className="self-stretch flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-[12px]">
            <img
              className="relative rounded-[50%] w-[50px] h-[50px] object-cover"
              alt=""
              src={imageURL ||
                "https://cdn.builder.io/api/v1/image/assets/TEMP/02487d23-1063-4dbe-b3bf-f05c18e2bcbf?"}
            />
            <div className="flex flex-col items-start justify-start gap-[2px]">
              <div className="relative tracking-[0.15px] leading-[140%] font-semibold">
                {senderName}
              </div>
              <div className="relative text-sm tracking-[0.15px] leading-[140%] font-light text-grey-500">
                Client
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-lavender flex flex-row items-center justify-start py-2 px-[18px]">
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0 cursor-pointer"
              alt=""
              src="/message.svg"
              onClick={handleMessageClick}
            />
          </div>
        </div>
        {isDropdownMenuOpen && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Top right"
            onOutsideClick={closeDropdownMenu}
          >
            <DropdownMenu />
          </PortalPopup>
        )}
      </div>
    </>
  );
};

export default OrderFormContainer;
