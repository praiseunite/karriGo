import ItemDetails from "../components/ItemDetails";
import SenderDetails from "../components/SenderDetails";
import OrderSummary from "../components/OrderSummary";
import ReceiverDetails from "../components/ReceiverDetails";
import MyHeader from "../layouts/Header/Header";

const CreateNewOrder = () => {
  return (
    <>
    <MyHeader current_tab={"Overview"} />
      <div className="top-[20%] left-[2%] mt-1 rounded-xl w-full overflow-hidden text-center text-5xl text-white items-stretch  justify-between gap-4 ml- mt-4 max-md:max-w-full max-md:flex-wrap">
        <div className="items-stretch flex grow basis-[0%] w-[50%] flex-col max-md:max-w-full">
          <ItemDetails />
        </div>
        <div className="items-stretch flex grow basis-[0%]  w-[50%] flex-col max-md:max-w-full">
          <SenderDetails />
        </div>
        <div className="items-stretch flex grow basis-[0%]  w-[50%] flex-col max-md:max-w-full">
          <ReceiverDetails />
        </div>
        <div className="absolute top-[50%] right-[1%] flex flex-col w-[30%] h-[60%] justify-start py-4 px-8  text-sm text-black max-md:max-w-full">
          <div className="items-stretch flex grow basis-[0%] max-w-[100%] flex-col max-md:max-w-full">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewOrder;
