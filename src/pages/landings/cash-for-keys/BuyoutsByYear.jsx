'use client';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

export default function BuyoutsByYear() {
  const [buyoutYears, setBuyoutYears] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.sheety.co/2996d79e2117ff0d746768a9b29ec03c/tenantBuyoutsAnalysis/tenantBuyoutsByYear'
      )
      .then((response) => {
        const data = response.data.tenantBuyoutsByYear;
        // console.log("by year", data);
        setBuyoutYears(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  var data = {
    labels: buyoutYears.map((x) => x.year),
    datasets: [
      {
        data: buyoutYears.map((x) => x.number),
        backgroundColor: ['#41ffca'],
        borderColor: ['#41ffca'],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'rgb(255, 255, 255)',
          font: {
            weight: 'bold',
            size: 12,
          },
        },
      },
      aria: {
        label:
          'Bar chart of number of tenant buyouts by year from 2019 to 2023. 1209 buyouts in 2019. 1100 buyouts in 2020. 878 buyouts in 2021. 893 buyouts in 2022. 789 buyouts in 2023.',
      },
    },
    scales: {
      y: {
        grid: {
          display: true,
          color: 'rgba(198, 198, 198, .5)',
        },
        ticks: {
          color: 'rgb(255, 255, 255)',
        },
        title: {
          display: true,
          text: '# of Buyouts',
          color: 'rgb(255, 255, 255)',
        },
      },
      x: {
        grid: {
          display: true,
          color: 'rgba(198, 198, 198, .5)',
        },
        ticks: {
          color: 'rgb(255, 255, 255)',
        },
      },
    },
  };

  return (
    <div className='mt-4 bg-zinc-900 py-4 px-1 sm:px-5 md:px-9 lg:px-20 xl:px-24'>
      <Bar data={data} height={100} width={150} options={options} />
    </div>
  );
}
