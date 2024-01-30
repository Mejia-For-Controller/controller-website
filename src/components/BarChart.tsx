// import { BarElement, CategoryScale, Chart, LinearScale, Title, Tooltip } from "chart.js";
// import { csvParse } from "d3";
// import { useTheme } from 'next-themes';
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

// interface ChartData {
//   fiscalYear: number;
//   estimatedPopulation: number;
//   personalIncome: number;
//   personalIncomePerCapita: number;
//   unemploymentRate: number;
// }

// const BarChart: React.FC = () => {
//   const [chartData, setChartData] = useState<ChartData[] | null>(null);
//   const { theme, setTheme } = useTheme()
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/csvsforpafr23/demographics.csv");
//         const csvData = await response.text();
//         // Parse and process CSV data
//         const dataArray: ChartData[] = csvParse(csvData, (d) => ({
//           fiscalYear: d["Fiscal Year"] ? +d["Fiscal Year"] : 0,
//           estimatedPopulation: d["Estimated Population"] ? parseInt(d["Estimated Population"].replace(/,/g, ""), 10) : 0,
//           personalIncome: d["Personal Income (in thousands)"] ? parseInt(d["Personal Income (in thousands)"].replace(/,/g, ""), 10) : 0,
//           personalIncomePerCapita: d["Personal Income Per Capita"] ? parseInt(d["Personal Income Per Capita"].replace(/,/g, ""), 10) : 0,
//           unemploymentRate: d["Unemployment Rate"] ? parseFloat(d["Unemployment Rate"].replace(/%/, "")) : 0,
//         }));
  
//         // Filter data for the years 2019 to 2023
//         const filteredData = dataArray.filter((data) => data.fiscalYear >= 2019 && data.fiscalYear <= 2023);
  
//         // Sort the filtered data by fiscalYear in ascending order
//         const sortedData = filteredData.sort((a, b) => a.fiscalYear - b.fiscalYear);
  
//         setChartData(sortedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
  
//     fetchData();
//   }, []);
  

//   if (!chartData) {
//     return null;
//   }

//   // Map chart data
//   const labels = chartData.map((data) => data.fiscalYear.toString());
//   const datasets = [
//     {
//       label: "Estimated Population",
//       data: chartData.map((data) => data.estimatedPopulation),
//       backgroundColor: "#41ffca",
//       type: 'bar', // specifying the type as 'bar' for population data
//     },
//     {
//       label: "Personal Income Per Capita",
//       data: chartData.map((data) => data.personalIncomePerCapita),
//       borderColor: "purple", // using borderColor for the line
//       backgroundColor: 'rgba(0,0,0,0)', // making background transparent
//       type: 'line', // specifying the type as 'line' for income data
//       fill: false, // ensuring the area under the line isn't filled
//       yAxisID: "incomeYAxis", // assuming you have a separate y-axis for income
//     },
//     {
//       label: "Unemployment Rate",
//       data: chartData.map((data) => data.unemploymentRate),
//       backgroundColor: "#FFCA41",
//       yAxisID: "percentageYAxis",
//       type: 'bar', // specifying the type as 'bar' for unemployment data
//     },
//   ];

//   function isDarkMode() {
//     if (typeof window !== 'undefined') {
//       const userPreference = localStorage.getItem('theme');
//       if (
//         userPreference === 'dark' ||
//         (userPreference === null &&
//           window.matchMedia('(prefers-color-scheme: dark)').matches)
//       ) {
//         return true;
//       }
//     }
//     return false;
//   }

//   function updateChartLabelColor() {
//     if (typeof window !== 'undefined') {
//       const isDark = isDarkMode();
//       document.documentElement.style.setProperty(
//         '--chart-label-color',
//         isDark
//           ? 'var(--chart-label-color-dark)'
//           : 'var(--chart-label-color-light)'
//       );
//     }
//   }
  
//   updateChartLabelColor();

//   const isDark = isDarkMode();

//   // Updated options
//   const options = {
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Fiscal Year",
//            color: isDark ? 'white' : 'black',
//         },
//         ticks: {
//           color: isDark ? 'white' : 'black',
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Values",
//           color: isDark ? 'white' : 'black',
//         },
//         ticks: {
//           color: isDark ? 'white' : 'black',
//         },
//         labels: {
//           color: isDark ? 'white' : 'black',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         labels: {
//           color: isDark ? 'white' : 'black',
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ width: "100%", height: "500px", overflowX: "auto" }}>
//       <Bar data={{ labels, datasets }} options={options} />
//     </div>
//   );
// };

// export default BarChart;
