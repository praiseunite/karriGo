import * as React from "react";
import { useState } from "react";

function ItemDetails() {
  const [isOpen, setOpen] = useState(Boolean);

  return (
    <>
      <div className="items-stretch bg-white flex w-[100%] max-md:max-w-full flex-col px-6 max-md:px-5 gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
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
              Item for delivery
            </button>
          </div>
        </div>

        {isOpen && (
          <form className="max-md:max-w-full w-[100%]">
            <div className="items-stretch  border border-[color:var(--Grey-300,#D0D5DD)] flex flex-col  mb-6 px-3 py-4 rounded-xl border-solid max-md:max-w-full">
              <div className="text-black text-xl font-semibold leading-5 capitalize whitespace-nowrap max-md:max-w-full">
                Item Details
              </div>
              <div className="text-black text-base leading-5 capitalize whitespace-nowrap mt-4 max-md:max-w-full">
                Dimensions
              </div>
              <label className="text-black text-left text-base leading-5 capitalize whitespace-nowrap mt-4 max-md:max-w-full">Item name</label>
              <div className="items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
                <input
                  type="text"
                  className="text-black text-base leading-5 w-full whitespace-nowrap rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-3 p-2.5 border-solid max-md:max-w-full"
                  onChange={(e)=> globalThis.itemName = e.target.value}
                />
              </div>
              <div className="items-stretch flex w-full justify-between gap-5 mt-3 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                <div className="items-stretch rounded border border-[color:var(--Grey-300,#D0D5DD)] flex justify-between gap-5 p-2.5 border-solid">
                  <div className="text-black text-base font-light capitalize">
                    L:
                  </div>
                  <input
                    type="number"
                    className="text-black text-base w-full font-medium  text-base leading-6 tracking-normal grow whitespace-nowrap outline-none border-none"
                    onChange={(e)=> globalThis.length = parseInt(e.target.value)}
                  />
                </div>
                <div className="items-stretch rounded border  border-[color:var(--Grey-300,#D0D5DD)] flex justify-between gap-5 p-2.5 border-solid">
                  <div className="text-black text-base font-light capitalize">
                    W:
                  </div>
                  <input
                    type="number"
                    className="text-black text-base w-full font-medium  text-base  tracking-normal grow whitespace-nowrap outline-none border-none"
                    onChange={(e)=> globalThis.width = parseInt(e.target.value)}
                  />
                </div>
                <div className="items-stretch rounded border border-[color:var(--Grey-300,#D0D5DD)] flex justify-between gap-5 p-2.5 border-solid">
                  <div className="text-black text-base font-light capitalize">
                    H:
                  </div>
                  <input
                    type="number"
                    className="text-black text-base w-full font-medium  text-base  tracking-normal grow whitespace-nowrap outline-none border-none"
                    onChange={(e)=> globalThis.height = parseInt(e.target.value)}
                  />
                </div>
                <div className="items-stretch rounded border border-[color:var(--Grey-300,#D0D5DD)] flex justify-between gap-5 p-2.5 border-solid">
                  <div className="text-black text-base font-light capitalize">
                    KG:
                  </div>
                  <input
                    type="number"
                    className="text-black text-base w-full font-medium  text-base  tracking-normal grow whitespace-nowrap outline-none border-none"
                    onChange={(e)=> globalThis.itemWeight = parseInt(e.target.value)}
                  />
                </div>

                <div className="items-stretch rounded border border-[color:var(--Grey-300,#D0D5DD)] flex justify-between gap-5 p-2.5 border-solid">
                  <div className="text-black text-base font-light capitalize">
                    ₦
                  </div>
                  <input
                    type="number"
                    className="text-black text-base w-full font-medium  text-base  tracking-normal grow whitespace-nowrap outline-none border-none"
                    onChange={(e)=> globalThis.declaredPrice = parseInt(e.target.value)}
                  />
                </div>
              </div>
              <div className="justify-between items-stretch flex gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
                <div className="items-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
                  <div className="text-black text-base leading-5 capitalize whitespace-nowrap max-md:max-w-full">
                    Description
                  </div>
                  <textarea
                    className="text-black text-base leading-5 w-full  whitespace-nowrap h-24 rounded border border-[color:var(--Grey-300,#D0D5DD)] mt-3 p-2.5 border-solid max-md:max-w-full"
                    placeholder=" Enter descriptions"
                    onChange={(e)=> globalThis.itemDescription = e.target.value}
                  ></textarea>
                </div>
                <div className="items-stretch flex basis-[0%] flex-col">
                  <div className="text-black text-base leading-5 whitespace-nowrap">
                    Package category
                  </div>
                  <div className="items-stretch flex justify-between gap-2 mt-3 pr-4">
                    <div className="text-zinc-500 text-base leading-5 self-center grow whitespace-nowrap my-auto">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-gender"
                        placeholder="Select your gender"
                        onChange={(e)=> globalThis.itemCategory = e.target.value}
                      >
                        <option value="">Select </option>
                        <option value="FRAGILE">Fragile</option>
                        <option value="PERISHABLES">Perishable</option>
                        <option value="DOCUMENTS">Documents</option>
                        <option value="OTHERS">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default ItemDetails;
