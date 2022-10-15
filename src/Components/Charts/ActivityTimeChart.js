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
    console.log(objectValues);
    const labels = ['Activity'];
    
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
            position: 'top',
            display: true
        },
        title: {
            display: true,
            text: 'Total time spent performing each activity',
        },
        },
        layout: {
            padding: 40
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (mins)'
                }
            }
        } 
    };

    // const data = {
    //     labels,
    //     datasets: [
    //       {
    //         data: [],
    //         borderColor: '#195591',
    //         backgroundColor: '#85a8ca',
    //       },
    //       {
    //         data: activityLog.Run,
    //         borderColor: '#195591',
    //         backgroundColor: '#85a8ca',
    //       }
    //     ]

    // };

    const data = {
        labels,
        datasets: []
    };

    for (let i = 0; i < objectValues.length; i++) {
        if (objectValues[i] > 0) {
            if (objectKeys[i] === 'Run') {
                data.datasets.push({
                    label: 'Running',
                    data: [objectValues[i]],
                    borderColor: '#ef476f',
                    backgroundColor: '#ef476f',
                })
            } else if (objectKeys[i] === 'Cycle') {
                data.datasets.push({
                    label: 'Cycling',
                    data: [objectValues[i]],
                    borderColor: '#f78c6b',
                    backgroundColor: '#f78c6b',
                })
            } else if (objectKeys[i] === 'Gym') {
                data.datasets.push({
                    label: 'Gym',
                    data: [objectValues[i]],
                    borderColor: '#06d6a0',
                    backgroundColor: '#06d6a0',
                })
            } else if (objectKeys[i] === 'Row') {
                data.datasets.push({
                    label: 'Rowing',
                    data: [objectValues[i]],
                    borderColor: '#ffd166',
                    backgroundColor: '#ffd166',
                })
            } else if (objectKeys[i] === 'Yoga') {
                data.datasets.push({
                    label: 'Yoga',
                    data: [objectValues[i]],
                    borderColor: '#118ab2',
                    backgroundColor: '#118ab2',
                })
            } else if (objectKeys[i] === 'Other') {
                data.datasets.push({
                    label: 'Other',
                    data: [objectValues[i]],
                    borderColor: '#073b4c',
                    backgroundColor: '#073b4c',
                })
            }
        }
    }
    
    // ADD DYNAMIC LABELLING TO CHART
    // for (let i = 0; i < objectKeys.length; i++){
    //     if (objectValues[i] > 0){
    //         labels.push(objectKeys[i]);
    //     }
    // }

    // ADD DYNAMIC DATA TO CHART
    // for (let i = 0; i < objectKeys.length; i++){
    //     if (objectValues[i] > 0){
    //         data.datasets[0].data.push(objectValues[i]);
    //     }
    // }

    return <Bar options={options} data={data} />;
}
