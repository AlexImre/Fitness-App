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
    const allEvents = props.allEvents;
    const monthlyLog = props.monthlyLog;
    const objectKeys = Object.keys(monthlyLog[9]);
    const objectValues = Object.values(monthlyLog[9]);
    // const monthlyActivity = [
    //     {id: 0, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 1, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 2, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 3, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 4, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 5, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 6, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 7, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 8, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 9, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 10, running: 0, cycling: 0, Rowing: 0, Gym: 0},
    //     {id: 11, running: 0, cycling: 0, Rowing: 0, Gym: 0}
    // ];

    // for (let i = 0; i < allEvents.length; i++) {
    //     if(allEvents[0].start === 0)

    // }


    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Running',
            data: [10, 12],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Cycling',
            data: [5, 7],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ]
      };


    // ADD DYNAMIC DATA TO CHART
    for (let i = 0; i < objectKeys.length; i++){
        if (objectValues[i] > 0){
            data.datasets[0].data.push(objectValues[i]);
        }
    }



  return <Bar options={options} data={data} />;
}
