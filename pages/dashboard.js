import React from "react";
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {

  const contentRef = useRef(null);

  const handleDownloadPdf = async () => {
    const content = contentRef.current;

    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('downloaded-pdf.pdf');
    }
  };


  return (
    <div>
      <div className="flex justify-end">
      <button onClick={handleDownloadPdf}
        className="z-20 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-2 rounded outline-none focus:outline-none ml-2 mt-2 mr-4 mb-2 ease-linear transition-all duration-150"
        type="button"
      >
        Export report
      </button>
      </div>
      <div className="mt-10" ref={contentRef}>
        <div className="flex z-30 p-5">
          <h2 className="text-xl font-bold ">Overview</h2>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardLineChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart />
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.layout = Admin;
