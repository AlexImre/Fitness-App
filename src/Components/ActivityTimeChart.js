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


export const ActivityTimeChart = (props) => {
    
    const activityLog = props.activityLog;
    const objectKeys = Object.keys(activityLog);
    const objectValues = Object.values(activityLog);
    const labels = [];
    
    const options = {
        indexAxis: 'y',
        elements: {
        bar: {
            borderWidth: 2,
        },
        },
        responsive: true,
        plugins: {
        legend: {
            position: 'right',
            display: false
        },
        title: {
            display: true,
            text: 'Total time spent performing each activity',
        },
        },
        layout: {
            padding: 30
        }
    };

    const data = {
        labels,
        datasets: [
          {
            data: [],
            borderColor: '#195591',
            backgroundColor: '#85a8ca',
          }
        ]

    };
    
    // ADD DYNAMIC LABELLING TO CHART
    for (let i = 0; i < objectKeys.length; i++){
        if (objectValues[i] > 0){
            labels.push(objectKeys[i]);
        }
    }

    // ADD DYNAMIC DATA TO CHART
    for (let i = 0; i < objectKeys.length; i++){
        if (objectValues[i] > 0){
            data.datasets[0].data.push(objectValues[i]);
        }
    }

    return <Bar options={options} data={data} height={100} />;
}
