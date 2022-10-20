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
      const monthlyYogaDataArray = [];
      const monthlyOtherDataArray = [];

      for (let i = 0; i < labels.length; i++){
        monthlyRunningDataArray.push(monthlyLog[i].Run);
        monthlyCyclingDataArray.push(monthlyLog[i].Cycle);
        monthlyRowingDataArray.push(monthlyLog[i].Row);
        monthlyGymDataArray.push(monthlyLog[i].Gym);
        monthlyYogaDataArray.push(monthlyLog[i].Yoga);
        monthlyOtherDataArray.push(monthlyLog[i].Other);
      }
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Running',
            data: monthlyRunningDataArray,
            backgroundColor: '#ef476f',
          },
          {
            label: 'Cycling',
            data: monthlyCyclingDataArray,
            backgroundColor: '#f78c6b',
          },
          {
            label: 'Rowing',
            data: monthlyRowingDataArray,
            backgroundColor: '#ffd166',
          },
          {
            label: 'Gym',
            data: monthlyGymDataArray,
            backgroundColor: '#06d6a0',
          },
          {
            label: 'Yoga',
            data: monthlyYogaDataArray,
            backgroundColor: '#118ab2',
          },
          {
            label: 'Other',
            data: monthlyOtherDataArray,
            backgroundColor: '#073b4c',
          },
        ]
      };

  return <Bar options={options} data={data} />;
}
