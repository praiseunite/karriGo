import React, { useState, useEffect, ChangeEvent } from "react";
import customFetch from "../CustomFetch";
import { format } from "date-fns";

interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  pictureUrl: string;
}

interface DriverDetails {
  id: number;
  firstName: string;
  lastName: string;
}

interface DataItem {
  trackingNum: string;
  status: string;
  orderDate: string;
  pickUpLocation: string;
  dropOffLocation: string;
  user: UserDetails;
  driver: DriverDetails;
}

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const [data, setData] = useState<DataItem[]>([]);
  const [records, setRecords] = useState<DataItem[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<DataItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLast, setLast] = useState(false);

  useEffect(()=>{
    handleSearch();
  }, [pageNo]);

  const handleSearch = async () => {
    if (searchValue === "") {
      setError(null);
      setRecords(data);
      return;
    }

    setError(null);

    const isEmail = searchValue.includes("@") && searchValue.indexOf("@") > 0;
    const isTrackingID = searchValue.startsWith("K");

    if (isEmail) {
      try {
        const response = await customFetch(localStorage.getItem("accessToken"))
          .get(
            `/admins/orders/search/${searchValue.toLowerCase()}?pageNo=${pageNo}&pageSize=${pageSize}`
          )
          .then((res) => {
            const searchData: DataItem[] = res.data.responseData;
            console.log(res);
            console.log(searchData);
            setRecords(searchData);
              console.log(pageNo);
            setLast(!(searchData.length >= 10));
 
          });
        setError(null);
      } catch (error) {
        console.error("Error fetching email search results:", error);

        setRecords([]);
      }
    } else if (isTrackingID) {
      try {
        const response = await customFetch(localStorage.getItem("accessToken"))
          .get("/admins/orders/search/tracking_no?trackingNum=" + searchValue)
          .then((res) => {
            const searchData = res.data.responseData;
            setRecords(searchData);
          });
        setError(null);
      } catch (error) {
        console.error("Error fetching tracking ID search results:", error);

        setRecords([]);
      }
    } else {
      setError("Invalid search input");
      setRecords([]);
      alert("Not Found");
    }
  };

  const handleShowDetails = (record: DataItem) => {
    setSelectedRecord(record);
  };

  const handleClosedDetails = () => {
    setSelectedRecord(null);
  };

  const gotoNextPage = () => {
    setPageNo(isLast ? pageNo : pageNo + 1);
  };

  const gotoPreviousPage = () => {
    setPageNo(pageNo <= 0 ? 0 : pageNo - 1);
  };

  const handleKeyPress=(event:any) =>{
    if(event.key === "enter"){
      console.log("We re here")
        handleSearch();
    }
  }

  return (
    <div className="bg-grey-300 min-h-screen flex flex-col ">
      <div className="justify-center items-stretch mt-7 self-center flex w-[100px] max-w-full gap-0 ">
        <div className="text-violet-700 text-6xl leading-[51px] tracking-wide">
          <span className="font-serif text-black">Karri</span>
          <span className="font-extrabold text-violet-700">GO</span>
        </div>
        <img
          loading="lazy"
          src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700902029/spjuhathw6q8wkzwdj3y.png"
          alt="Karrigo logo"
          className=" mr-6 object-contain object-center w-30 h-20 overflow-hidden shrink-0 max-w-full self-end md:flex md:flex-col items-stretch"
        />
      </div>

      <form>
        <div className="flex ml-[30%] pb-4">
          <input
            type="text"
            className="border-4 p-2.5  rounded-full"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for orders..."
            style={{ width: "50%" }}
            onKeyDown={handleKeyPress}
          />

          <button
            type="button"
            className="text-white font-semibold px-5 py-2.5 rounded-2xl bg-violet-500 hover:bg-violet-700 "
            onClick={handleSearch}
           
          >
            Search
          </button>
        </div>
      </form>

      {records.length >= 1 && (
        <>
          <table className="mx-[20rem] rounded-lg  border border-gray-300">
            <thead className="bg-violet-300 font-medium text-shadow-sm ">
              <tr>
                <th className="pl-3 ">No</th>
                <th className="py-2">Tracking ID</th>
                <th>Date-Created</th>
                <th>Status</th>
                <th className="pr-3">Customer Name</th>
              </tr>
            </thead>

            <tbody style={{ background: "white", cursor: "pointer" }}>
              {records.map((d, i) => (
                <tr
                  key={i}
                  onClick={() => handleShowDetails(d)}
                  style={{ border: "1px solid #ccc" }}
                >
                  <td>{i  + pageNo*10 + 1 + "."}</td>
                  <td className="py-3.5">{d.trackingNum}</td>
                  <td>{format(new Date(d.orderDate), "yyyy-MM-dd")}</td>
                  <td>{d.status}</td>
                  <td>{d.user.firstName}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center pb-4">
            <button
              type="button"
              className={`px-4 py-2 mr-[50rem] ${pageNo <= 0 ? "bg-violet-200" : "bg-violet-500 hover:bg-violet-700"}  rounded-full text-white`}
              onClick={gotoPreviousPage}
            >
              Back
            </button>
            <button
              type="button"
              className={`px-4 py-2  ${isLast ? "bg-violet-200" : "bg-violet-500"} rounded-full text-white`}
              onClick={gotoNextPage}
            >
              Next
            </button>
          </div>
        </>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {selectedRecord && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="absolute inset-0 bg-grey-300 opacity-75"></div>
          <div className="relative bg-white p-6 rounded-lg">
            <h1 className="text-2x1 font-semibold mb-4">
              {" "}
              ID : {selectedRecord.trackingNum}{" "}
            </h1>
            <p>Status: {selectedRecord.status}</p>
            <p>
              Date Created:{" "}
              {format(new Date(selectedRecord.orderDate), "yyyy-MM-dd")}
            </p>
            <p>User: {selectedRecord.user.firstName}</p>
            <p>Pickup: {selectedRecord.pickUpLocation}</p>
            <p>Drop-off: {selectedRecord.dropOffLocation}</p>
            <p>Driver: {selectedRecord.driver.firstName}</p>
            <button
              className="mt-4 bg-purple-700 text-white px-4 py-2 rounded transition-all hover:bg-purple-900 hover:shadow-md"
              onClick={handleClosedDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchPage;
