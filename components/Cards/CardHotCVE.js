import React from "react";
import Link from "next/dist/client/link";
import { useState, useEffect } from "react";

// components

export default function CardHotCVE() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    // 백엔드에서 전달받은 데이터를 처리하기 위한 함수
    const processData = async () => {
      try {
        // POST 요청으로 받은 응답 데이터를 백엔드에서 가져오는 코드
        // 이 예제에서는 가정적인 코드입니다. 실제 코드는 백엔드 응답에 따라 달라집니다.

        const response = await fetch(`http://54.180.109.131:5000/cve/detail/latest?count=9`);
        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패하였습니다.');
        }
        console.log("HOTCVE")
        const data = await response.json();
        console.log(data);
        // 데이터를 상태에 저장하여 컴포넌트에서 사용할 수 있도록 합니다.
        setResponseData(data["latest"]);
      } catch (error) {
        console.error('데이터 처리 중 오류 발생:', error);
      }
    };

    processData();
  }, []);
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Hot CVE Number
              </h3>
            </div>
            {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  CVE Number
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Severity
                </th>
              </tr>
            </thead>
            <tbody>
              {responseData === null ? (<tr><th>Loading...</th><td>Loading...</td></tr>) : responseData ? (
                Object.entries(responseData).map(([key, value]) => (
                <React.Fragment key={key}>
                  <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <Link href={`cve/${value}`}>
                    {value}
                    </Link>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    9.8 CRITICAL
                  </td>
                  </tr>
                </React.Fragment>
                // console.log(value)
                ))) : (
                  <tr>
                    <th>No data available.</th>
                    <td>No data available.</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
