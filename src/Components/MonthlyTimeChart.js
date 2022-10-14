import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function TotalTimeChart(props) {
    // GET DATA ONLY FOR YEAR === 2022??
    const monthlyLog = props.monthlyLog;

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Time spent on activities per month',
          },
        },
        layout: {
          padding: 40
      }
      };
      
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

      const monthlyRunningDataArray = [];
      const monthlyCyclingDataArray = [];
      const monthlyRowingDataArray = [];
      const monthlyGymDataArray = [];

      for (let i = 0; i < labels.length; i++){
        monthlyRunningDataArray.push(monthlyLog[i].Running);
        monthlyCyclingDataArray.push(monthlyLog[i].Cycling);
        monthlyRowingDataArray.push(monthlyLog[i].Rowing);
        monthlyGymDataArray.push(monthlyLog[i].Gym);
      }
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Running',
            data: monthlyRunningDataArray,
            backgroundColor: 'rgba(100, 99, 132, 0.5)',
          },
          {
            label: 'Cycling',
            data: monthlyCyclingDataArray,
            backgroundColor: 'rgba(200, 99, 132, 0.5)',
          },
          {
            label: 'Rowing',
            data: monthlyRowingDataArray,
            backgroundColor: 'rgba(50, 99, 132, 0.5)',
          },
          {
            label: 'Gym',
            data: monthlyGymDataArray,
            backgroundColor: 'rgba(01, 200, 132, 0.5)',
          },
        ]
      };

  return <Bar options={options} data={data} />;
}
