"use client";
import axios from "axios";
import {Chart, registerables} from "chart.js";
import { useEffect, useState } from "react";
import {Bar} from "react-chartjs-2";


Chart.register(...registerables);

export default function DeathRace() {
  const [race, setRace] = useState([]);

  useEffect(() => {
    axios
    .get('https://api.sheety.co/2996d79e2117ff0d746768a9b29ec03c/2023UnhousedDeathsIngest/race')
    .then((response) => {
        const data = response.data.race;
        // console.log("race", data);
        setRace(data);
    })
    .catch((error) => {
        console.error("Error:", error);
    })
  }, []);

    var data = {
        labels: race.map((x) => x.race),
        datasets: [
          {
            data: race.map((x) => x.numberOfDeaths),
            backgroundColor: [
              "#41ffca",
            ],
            borderColor: [
              "#41ffca",
            ],
            borderWidth: 1,
          },
        ],
      };
    
      var options = {
        plugins: {
          legend: {
            display: false,
            labels: {
              color: "rgb(255, 255, 255)",
              font: {
                weight: "bold",
                size: 12,
              },
            },
          },
        },
        scales: {
          y: {
            grid: {
              display: true,
              color: "rgba(198, 198, 198, .5)",
            },
            ticks: {
              color: "rgb(255, 255, 255)",
            },
            title: {
                display: true,
                text: '# of Deaths',
              color: "rgb(255, 255, 255)",
            }
          },
          x: {
            grid: {
              display: true,
              color: "rgba(198, 198, 198, .5)",
            },
            ticks: {
              color: "rgb(255, 255, 255)",
            },
          },
        },
      };
    
      return (
        <div className="mt-4 py-4 px-1 sm:px-5 md:px-9 lg:px-9 xl:px-9 bg-zinc-900">
          <Bar data={data} height={100} width={150} options={options} />
        </div>
      );
}