import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function Graph() {
    const data = {
        labels: ['\'22. 12', '\'22. 12', '\'22. 1', '\'22. 2', '\'22. 3', '\'22. 4'],
        datasets: [
          {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [1, 2, 3, 4, 5, 3],
          }
        ],
      };
      
  return (
    <>
        <Line data={data} />
    </>
  );
}
