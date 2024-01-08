import { AxiosError } from "axios";
import * as React from "react";
import customFetch from "../../CustomFetch";
import { useEffect, useState } from "react";

function GraphDiagram() {
  const [userCount, setUserCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(()=> {
    getCount();
  }, [])

  const getCount = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get("/admins/get_count")
        .then((res) => {
          const data = res.data.responseData;

          setUserCount(data.userCount);
          setDriverCount(data.driverCount);

          console.log(data);
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (
    <div className="justify-between items-stretch self-stretch flex w-full gap-5 pl-12 pr-20 py-3 max-md:max-w-full max-md:flex-wrap max-md:px-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
          <div className="bg-white flex w-full grow items-stretch justify-between gap-5 mx-auto pl-8 pr-6 py-6 rounded-2xl max-md:mt-6 max-md:px-5">
            <div className="flex grow basis-[0%] flex-col items-stretch">
              <div className="items-stretch flex justify-between gap-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5aab8f468b062b197ea367c75bcb39bee192ff8fdfb50da4bb74b50008e946d9?"
                  className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-slate-500 text-xl font-medium leading-6 grow whitespace-nowrap">
                  Customers
                </div>
              </div>
              <div className="text-zinc-900 text-3xl font-bold leading-8 tracking-tighter whitespace-nowrap mt-7">
                {userCount}
              </div>
              <div className="items-stretch flex justify-between gap-0.5 mt-2 pr-4"></div>
            </div>
            <div className="flex items-start gap-2.5 mt-6 self-end max-md:justify-center">
              <div className="bg-violet-700 self-stretch flex w-[11px] shrink-0 h-[91px] flex-col rounded-lg" />
              <div className="bg-violet-100 flex w-3 shrink-0 h-16 flex-col mt-7 rounded-lg self-end" />
              <div className="bg-violet-100 flex w-[11px] shrink-0 h-[74px] flex-col mt-4 rounded-lg self-start" />
              <div className="bg-violet-700 flex w-[11px] shrink-0 h-7 flex-col mt-16 rounded-lg self-end max-md:mt-10" />
              <div className="bg-violet-700 flex w-3 shrink-0 h-[49px] flex-col mt-11 rounded-lg self-end max-md:mt-10" />
              <div className="bg-violet-100 flex w-[11px] shrink-0 h-[85px] flex-col mt-1.5 rounded-lg self-start" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="bg-white flex w-full grow items-stretch justify-between gap-5 mx-auto pl-8 pr-6 py-6 rounded-2xl max-md:mt-6 max-md:px-5">
            <div className="flex grow basis-[0%] flex-col items-stretch">
              <div className="items-stretch flex justify-between gap-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5aab8f468b062b197ea367c75bcb39bee192ff8fdfb50da4bb74b50008e946d9?"
                  className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-slate-500 text-xl font-medium leading-6 grow whitespace-nowrap">
                  Drivers
                </div>
              </div>
              <div className="text-zinc-900 text-3xl font-bold leading-8 tracking-tighter whitespace-nowrap mt-7">
                {driverCount}
              </div>
              <div className="items-stretch flex justify-between gap-0.5 mt-2 pr-2.5"></div>
            </div>
            <div className="flex items-start gap-2.5 mt-6 self-end max-md:justify-center">
              <div className="bg-violet-700 self-stretch flex w-[11px] shrink-0 h-[91px] flex-col rounded-lg" />
              <div className="bg-violet-100 flex w-3 shrink-0 h-16 flex-col mt-7 rounded-lg self-end" />
              <div className="bg-violet-100 flex w-[11px] shrink-0 h-[74px] flex-col mt-4 rounded-lg self-start" />
              <div className="bg-violet-700 flex w-[11px] shrink-0 h-7 flex-col mt-16 rounded-lg self-end max-md:mt-10" />
              <div className="bg-violet-700 flex w-3 shrink-0 h-[49px] flex-col mt-11 rounded-lg self-end max-md:mt-10" />
              <div className="bg-violet-100 flex w-[11px] shrink-0 h-[85px] flex-col mt-1.5 rounded-lg self-start" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GraphDiagram;
