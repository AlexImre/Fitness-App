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


export const ChartComponent = (props) => {

    const activityLog = props.activityLog;
    console.log(activityLog);

    
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
        text: 'Chart.js Horizontal Bar Chart',
    },
    },
    };
    
    // const labels = ['Running', 'Cycling', 'Gym', 'Rowing'];
    const labels = [];
  
    const data = {
    labels,
    datasets: [
      {
        data: [10,12],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
    };

    // IF OBJECT.VALUES(OBJECT[I]) !== 0 THEN ADD OBJECT.KEY(OBJECT[I]) to LABELS.
    const entries = Object.entries(activityLog);

    for (let i = 0; i < entries.length; i++){
        
    }

    console.log(`labels: ${labels}`);
    console.log(`object entries: ${Object.entries(activityLog)}`);
    console.log(`entries type: ${typeof entries}`);
    console.log(`entries[1][1]: ${entries[1][1]}`);
    console.log(`activityLog[0]: ${activityLog.running}`);
    console.log(`activityLog[1]: ${activityLog.cycling}`);
    console.log(`activityLog[2]: ${activityLog[2]}`);

    return <Bar options={options} data={data} />;
}
