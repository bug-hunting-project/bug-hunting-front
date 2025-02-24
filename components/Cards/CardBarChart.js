import React from "react";
import Chart from "chart.js";
import Cookies from 'js-cookie';
import { useState } from "react";

export default function CardBarChart() {
  const [resultData, setResultData] = useState(null);

  React.useEffect(() => {
    const processData = async () => {
      try {
        const scanID = Cookies.get('scanID');

        const response = await fetch(`http://54.180.109.131:5000/sbom/result?resultID=${scanID}`);
        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패하였습니다.');
        }

        const data = await response.json();
        console.log(data);
        // 데이터를 상태에 저장하여 컴포넌트에서 사용할 수 있도록 합니다.
        setResultData(data["results"]);

        let resultLabels = Object.keys(data["results"]);
        console.log(resultLabels);

        const vulnerabilityCounts = {};
        let resultLabelCount = []
        // "results" 객체 내의 각 라이브러리를 순회하며 "vulnerability" 객체의 개수를 세어 저장합니다.
        for (const library in data.results) {
          const vulnerabilities = data.results[library].vulnerability;
          const vulnerabilityCount = Object.keys(vulnerabilities).length;
          vulnerabilityCounts[library] = vulnerabilityCount;
          resultLabelCount.push(vulnerabilityCount)
        }

        // 결과를 리스트로 만듭니다.
        const resultList = Object.keys(vulnerabilityCounts).map(library => ({ library, vulnerabilityCount: vulnerabilityCounts[library] }));

        console.log(Object.values(resultList));
        console.log(resultLabelCount)

        let config = {
          type: "bar",
          data: {
            labels: resultLabels,
            datasets: [
              {
                label: "Vuln Count",
                backgroundColor: "#ed64a6",
                borderColor: "#ed64a6",
                data: resultLabelCount,
                fill: false,
                barThickness: 8,
              }
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Orders Chart",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            legend: {
              labels: {
                fontColor: "rgba(0,0,0,.4)",
              },
              align: "end",
              position: "bottom",
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  scaleLabel: {
                    display: true,
                    labelString: "Month",
                  },
                  gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(33, 37, 41, 0.3)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                  },
                  gridLines: {
                    borderDash: [2],
                    drawBorder: false,
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.2)",
                    zeroLineColor: "rgba(33, 37, 41, 0.15)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };
        let ctx = document.getElementById("bar-chart").getContext("2d");
        window.myBar = new Chart(ctx, config);
      } catch (error) {
        console.error('데이터 처리 중 오류 발생:', error);
      }};
      
      processData();
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Vulnerability Summary
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
