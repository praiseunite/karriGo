import { Header } from "antd/es/layout/layout";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import CustomerGrowthContainer from "./CustomerGrowthContainer";
import OrderFormContainer from "./OrderFormContainer";
import AdminHeader from "../AdminHeader";
import GraphDiagram from "./GraphDiagram";
import { AxiosError } from "axios";
import customFetch from "../../CustomFetch";

interface LastestOrder {
  orderId: number;
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  trackingNum: string;
  imageURL: string;
  orderStatus: string;
}

const AdminOverview = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLast, setLast] = useState(false);
  const [error, setError] = useState("");

  const [orders, setOrders] = useState<LastestOrder[]>();
  useEffect(() => {
    pageOrders();
  }, [pageNo]);

  const pageOrders = async () => {
    try {
      const response = await customFetch(localStorage.getItem("accessToken"))
        .get(
          "/admins/unassigned_order?pageNo=" + pageNo + "&pageSize=" + pageSize
        )
        .then((res) => {
          const data = res.data.responseData;

          setPageNo(data.pageNo);
          setPageSize(data.pageSize);
          setLast(data.last);
          setOrders(data.content);

          console.log(data)
        });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const gotoNextPage = () => {
    setPageNo(isLast ? pageNo : pageNo + 1);
  };

  const gotoPreviousPage = () => {
    setPageNo(pageNo <= 0 ? 0 : pageNo - 1);
  };

  return (
    <div>
      <AdminHeader current_tab={"Overview"} />
    <div className="max-w-full">
      <div>
        <GraphDiagram />
      </div>

      <CustomerGrowthContainer />
      <div className="absolute top-[25%] left-[1014px] grid gap-4 grid-cols-[repeat(auto-fill, minmax(300px,1fr))] overflow-y-auto h-[800px]">
        {orders &&
          orders.map((order) => (
            <OrderFormContainer
              orderId={order?.orderId}
              senderName={order?.senderName}
              senderAddress={order?.senderAddress}
              receiverName={order?.receiverName}
              receiverAddress={order?.receiverAddress}
              trackingNum={order?.trackingNum}
              imageURL={order?.imageURL}
              orderStatus={order?.orderStatus}
            />
          ))}

        {orders && (<div className="flex flex-row mb-[4rem]">
          <button
            type="button"
            className={`text-white text-l ${
              pageNo <= 0
                ? "bg-violet-200"
                : "bg-violet-500 hover:bg-violet-700"
            } mt-8 mr-[9rem] font-semibold leading-5 whitespace-nowrap justify-center items-center
              px-5 py-3 rounded-3xl max-md:max-w-full `}
            onClick={gotoPreviousPage}
          >
            Previous Page
          </button>
          <button
            type="button"
            className={`text-white text-l ${
              isLast ? "bg-violet-200" : "bg-violet-500 hover:bg-violet-700"
            } mt-8 font-semibold leading-5 whitespace-nowrap justify-center items-center
              px-5 py-3 rounded-3xl max-md:max-w-full `}
            onClick={gotoNextPage}
          >
            Next Page
          </button>
        </div>)}
      </div>
      </div>
    </div>
  );
};

export default AdminOverview;
