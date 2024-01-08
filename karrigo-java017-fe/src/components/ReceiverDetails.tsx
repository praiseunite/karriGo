import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const googleMapsApiKey: string = process.env
  .REACT_APP_GOOGLE_MAPS_API_KEY as string;
const libraries: any = ["drawing", "places"];

function ReceiverDetails() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  const dropOffRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(Boolean);

  useEffect(() => {
    const intervalId = setInterval(() => {
      globalThis.receiverAddress = dropOffRef.current?.value || "";
    }, 1000);

    return () => clearInterval(intervalId);
  });
  return (
    <div className="items-stretch bg-white flex flex-col px-6 max-md:px-5">
      <div className="justify-between items-stretch flex w-full gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
        <div className="items-stretch flex justify-between gap-2.5">
          {isOpen && (
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4aab53f-4e94-49dc-8763-b2d470cc5bb3?"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
            />
          )}

          {!isOpen && (
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/50f296ef-5f86-40bb-9c82-553c02b3f3aa?"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
            />
          )}
          <button
            className={`text-black text-base ${
              !isOpen ? "bg-violet-200 p-2.5" : ""
            } "font-medium leading-5 lowercase self-center grow whitespace-nowrap my-auto`}
            onClick={() => setOpen(!isOpen)}
          >
            Receiver Details
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="items-stretch border border-[color:var(--Grey-300,#D0D5DD)] flex flex-col mt-4 mb-6 px-3 py-4 rounded-xl border-solid max-md:max-w-full">
          <div className="items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
            <div className="items-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
              <div className="text-black text-base leading-5 capitalize whitespace-nowrap max-md:max-w-full">
                Receiver’s Full Name
              </div>
              <input
                className="text-black text-base leading-5  whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-3 p-2.5 border-solid max-md:max-w-full"
                placeholder="Enter full name"
                onChange={(e) => (globalThis.receiverName = e.target.value)}
              />
            </div>
            <div className="items-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
              <div className="text-black text-base leading-5 capitalize whitespace-nowrap max-md:max-w-full">
                Receiver’s Phone
              </div>
              <input
                className="text-black text-base leading-5  whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-3 p-2.5 border-solid max-md:max-w-full"
                type="text"
                id="phoneNumber"
                placeholder="phone number"
                onChange={(e) => (globalThis.receiverPhone = e.target.value)}
              />
            </div>
          </div>
          <div className="items-stretch flex justify-between gap-4 mt-4 max-md:max-w-full max-md:flex-wrap">
            <div className="items-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
              <div className="text-black text-base leading-5 capitalize whitespace-nowrap max-md:max-w-full">
                Receiver’s dropoff location
              </div>
              <Autocomplete>
                <input
                  className="text-black text-base leading-5 whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-3 p-2.5 border-solid max-md:max-w-full w-full"
                  placeholder="Dropoff location"
                  autoFocus={true}
                  ref={dropOffRef}
                />
              </Autocomplete>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceiverDetails;
