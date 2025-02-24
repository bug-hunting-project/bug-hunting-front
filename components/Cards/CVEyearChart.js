import React from "react";
import Chart from "chart.js";

export default function CVEyearChart() {
  // const [chartData, setChartData] = useState({

  // })
  // const [responseData, setResponseData] = useState(null);

  React.useEffect(() => {
    const processData = async () => {
      try {
        // POST 요청으로 받은 응답 데이터를 백엔드에서 가져오는 코드
        // 이 예제에서는 가정적인 코드입니다. 실제 코드는 백엔드 응답에 따라 달라집니다.

        const response = await fetch(`http://54.180.109.131:5000/count/year-all`);
        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패하였습니다.');
        }

        const thisYear = new Date().getFullYear();
        const thisyears = "2023"
        const data = await response.json();
        console.log(data);
        // 데이터를 상태에 저장하여 컴포넌트에서 사용할 수 있도록 합니다.
        let config = {
          type: "bar",
          data: {
            labels: [
              thisYear-4,
              thisYear-3,
              thisYear-2,
              thisYear-1,
              thisYear
            ],
            datasets: [
              {
                label: "CVE Counts",
                backgroundColor: "#ed64a6",
                borderColor: "#ed64a6",
                data: [data[thisYear],data[thisYear-1],data[thisYear-2],data[thisYear-3],data[thisYear-4]],
                fill: false,
                barThickness: 8,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
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
      }
    };

    processData();

  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total orders
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
