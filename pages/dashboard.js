import React from "react";
import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Link from "next/dist/client/link";
import axios from "axios";
// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardHotCVE from "components/Cards/CardHotCVE.js"

// layout for page

import Admin from "layouts/Admin.js";
import Cookies from 'js-cookie';

export default function Dashboard() {
  const [responseData, setResponseData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [gptDatas, setGptDatas] = useState({});
  const [dataCount, setDataCount] = useState(0);
  const [pContent, setPContent] = useState({});

  const contentRef = useRef(null);
  const [pages, setPages] = useState([]);


  const capturePage = async () => {
    const content = contentRef.current;
    if (content) {
      const { clientWidth, clientHeight } = content;
      const canvas = await html2canvas(content, { scale: 2, width: clientWidth, height: clientHeight });
      const imgData = canvas.toDataURL('image/png');
      setPages((prevPages) => [...prevPages, imgData]);
    }
  };

  const handleDownloadPdf = () => {
    if (pages.length > 0) {
      const pdf = new jsPDF();
      pages.forEach((imageData, index) => {
        if (index > 0) {
          pdf.addPage();
        }
        pdf.addImage(imageData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), '', 'FAST');
      });
      pdf.save('report-pdf.pdf');
    }
  };
  useEffect(() => {
    // 백엔드에서 전달받은 데이터를 처리하기 위한 함수
    const processData = async () => {
      try {
        // POST 요청으로 받은 응답 데이터를 백엔드에서 가져오는 코드
        // 이 예제에서는 가정적인 코드입니다. 실제 코드는 백엔드 응답에 따라 달라집니다.

        const scanID = Cookies.get('scanID');

        const response1 = await fetch(`http://54.180.109.131:5000/sbom/scan?filename=${scanID}`);
        if (!response1.ok) {
          throw new Error('데이터를 가져오는 데 실패하였습니다.');
        }

        const data = await response1.json();
        console.log(data);
        // 데이터를 상태에 저장하여 컴포넌트에서 사용할 수 있도록 합니다.
        setResponseData(data);
////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        const response2 = await fetch(`http://54.180.109.131:5000/sbom/result?resultID=${scanID}`);
        if (!response2.ok) {
          throw new Error('데이터를 가져오는 데 실패하였습니다.');
        }

        const data2 = await response2.json();
        console.log("data2['results']",data2['results']);

        setResultData(data2["results"]);

        const vulnerabilityCounts = {};

        for (let selected in data2["results"]) {
          const vulnerabilityCount =
          data2["results"][selected].vulnerability && Object.keys(data2["results"][selected].vulnerability).length;
          vulnerabilityCounts[selected] = vulnerabilityCount;
        }

        let transformedData = {};

        for (const key in vulnerabilityCounts) {
          transformedData[key] = new Array(vulnerabilityCounts[key]).fill({});
        }
        console.log(transformedData)


        const totalvulncount = calculateTotalVulnerabilities(data2["results"]);
        setDataCount(totalvulncount);
        setPContent(transformedData);
        setGptDatas(transformedData);        

        


        // 데이터를 상태에 저장하여 컴포넌트에서 사용할 수 있도록 합니다.
        setResultData(data2["results"]);
      } catch (error) {
        console.error('데이터 처리 중 오류 발생:', error);
      }
    };

    const calculateTotalVulnerabilities = (results) => {
      let count = 0;
      for (const [, value] of Object.entries(results)) {
        if (value && value.vulnerability) {
          count += Object.keys(value.vulnerability).length;
        }
      }
      return count;
    };

    processData();
    capturePage();
    window.addEventListener('resize', capturePage);
    return () => {
      window.removeEventListener('resize', capturePage);
    };

  }, []);


  const fetchGptDataFromServer = async (key, cve_id, index) => {
    try {
      const response = await fetch(`http://54.180.109.131:5000/gpt/report/${cve_id}`);
      const fetchedGptData = await response.json();
      console.log(fetchedGptData["response"])
      
      const updatedPContent = {...pContent};


      console.log(updatedPContent[key][index])
      updatedPContent[key][index] = fetchedGptData["response"];
      console.log(updatedPContent)
      setPContent(updatedPContent);
      setGptDatas(updatedPContent);    
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  const postToServer = async (information) => {
      const forreportobject = {}
      forreportobject["response"] = information[0]
      console.log(JSON.stringify(forreportobject))
      const postresponse = await fetch(`http://54.180.109.131:5000/gpt/report/file`,{ 
        method: 'POST',
        headers: {
          'accept' : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forreportobject),
      })

      const blob = await postresponse.blob();
      const url = URL.createObjectURL(blob);

      const fileName = 'report.docx';
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // console.log(postresponse)
  }

  return (
    <div className="pdf-content" ref={contentRef}>
      <div className="flex justify-end">
      <button onClick={handleDownloadPdf}
        className="z-20 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-2 rounded outline-none focus:outline-none ml-2 mt-2 mr-4 mb-2 ease-linear transition-all duration-150"
        type="button"
      >
        Export report
      </button>
      </div>
      <div className="mt-10">
        <div className="flex z-30 p-5">
          <h2 className="text-xl font-bold ">Overview</h2>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardHotCVE />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart />
          </div>
        </div>
        {/* <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div>
        </div> */}
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-blueGray-100 border-0 px-4">
          <div className="flex z-30 p-5">
            <h2 className="text-xl font-bold ">Vulnerability List</h2>
          </div>
        {resultData ? (
        <ul className="bg-white shadow-lg">
          {Object.entries(resultData).map(([highkey, value]) => (
            <li className="m-4 bg-yellow" key={highkey}>
              <h3 className="rounded p-2 m-2 font-bold bg-gray-300 w-1/2">Package Name : {highkey}</h3>
              {value.vulnerability && (
                <ul>
                  {Object.entries(value.vulnerability).map(([innerKey, innerValue], index) => (
                    <li className="pl-3 m-1" key={innerKey}>
                      CVE Code : {innerKey}
                      <ul>
                        {innerValue && innerValue.severity && (
                          <li className="text-s pl-3">
                            Severity: {innerValue.severity}
                          </li>
                        )}
                      </ul>
                      <button onClick={() => console.log(fetchGptDataFromServer(highkey, innerKey, index))}>Get Chat GPT Guide</button>
                      {/* <p>{console.log(pContent[index])}</p> */}
                      {index ? <></> :  <><p>{JSON.stringify(pContent[highkey])}</p>
                      <button onClick={() => console.log(postToServer(pContent[highkey]))}>Get report</button></>
                      }
                      
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        ) : (
          <p>No data available.</p>
        )}
        </div>
      </div>
      <style jsx>{`
        h3 {background-color: rgba(128, 128, 128, 0.2);}
      `}</style>
    </div>
  );
}

Dashboard.layout = Admin;
