import { AxiosError } from "axios";
import { FunctionComponent, useState } from "react";
import customFetch from "../../CustomFetch";

interface TaskId{
  taskId: number
}

const Frame = ({taskId}: TaskId) => {
  const [error, setError] = useState("");

  const orderResponse = async (status: string) => {
    console.log("Task id is: ", taskId);
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .post(`/drivers/task_status?taskId=${taskId}&status=${status}`)
        .then((res) => {
          const data = res.data.responseData;
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);
  
      console.log("Error: ", err);
    }
  };
  return (
    <div className="rounded bg-white box-border flex flex-col items-start justify-start gap-[4px] max-w-full max-h-full overflow-auto text-left text-base text-green-2 font-body-textmedium-16 border-[1px] border-solid border-grey-200">
      <div className="flex flex-row items-center justify-start py-2 px-4 gap-[16px] border-b-[1px] border-solid border-grey-200">
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src="/Accept.jpg"
        />
        <div className="relative leading-[19px] font-medium cursor-pointer"
        onClick={()=>orderResponse("ACCEPTED")}
        >Accept</div>
      </div>
      <div className="flex flex-row items-center justify-start py-2 px-4 gap-[16px] text-red">
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src="/Decline.jpg"
        />
        <div className="relative leading-[19px] font-medium cursor-pointer"
        onClick={()=>orderResponse("REJECTED")}
        >Decline</div>
      </div>
    </div>
  );
};

export default Frame;
