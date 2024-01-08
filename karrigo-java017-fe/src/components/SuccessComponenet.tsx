import * as React from "react";

const SuccessComponenet: React.FC = (props) =>{
  return (
    <div className="justify-center items-center bg-gray-50 flex flex-col p-8 rounded-2xl max-md:px-5">
      <div className="text-violet-700 text-2xl font-medium leading-8 self-stretch whitespace-nowrap max-md:max-w-full">
        Delivery Request Accepted Successfully!
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/12bd915fa227d092b3836ce00b6f2efd442e954af47acac3638e47eee9059d90?"
        className="aspect-square object-contain object-center w-20 overflow-hidden self-center max-w-full mt-8"
      />
      <div className="text-zinc-500 text-center text-base font-medium leading-6 self-stretch mt-8 max-md:max-w-full">
        Congratulations! You've successfully accepted the delivery request.
      </div>{" "}
      <div className="text-zinc-100 text-base font-bold leading-3 whitespace-nowrap justify-center items-center bg-violet-700 self-stretch mt-8 px-16 py-5 rounded-[100px] max-md:max-w-full max-md:px-5">
        Continue
      </div>
    </div>
  );
}
export default SuccessComponenet

