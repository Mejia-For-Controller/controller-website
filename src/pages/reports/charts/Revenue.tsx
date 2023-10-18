import axios from 'axios';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
interface RevenueSource {
  fiscalYear: number;
  category: string;
  revenueSource: string;
  amount: number;
  budgetActual: string;
  id: number;
}

interface TotalRevenue {
  fiscalYear: number;
  totalRevenues: number;
  budgetActual: string;
  id: number;
}

function Revenue() {
  const [category, setCategory] = useState('General Fund');
  const [fiscalYear, setFiscalYear] = useState(2023);
  const [revenueSourcesData, setRevenueSourcesData] = useState<RevenueSource[]>(
    []
  );
  const [totalRevenuesData, setTotalRevenuesData] = useState<TotalRevenue[]>(
    []
  );

  useEffect(() => {
    axios
      .get(
        'https://api.sheety.co/2996d79e2117ff0d746768a9b29ec03c/pfr/revenueSources'
      )
      .then((response) => {
        setRevenueSourcesData(response.data.revenueSources);
      })
      .catch((error) => {
        console.error('Error fetching revenue sources data:', error);
      });

    axios
      .get(
        'https://api.sheety.co/2996d79e2117ff0d746768a9b29ec03c/pfr/totalRevenues'
      )
      .then((response) => {
        setTotalRevenuesData(response.data.totalRevenues);
      })
      .catch((error) => {
        console.error('Error fetching total revenues data:', error);
      });
  }, []);

  const getFilteredRevenueData = () => {
    return revenueSourcesData.filter(
      (item) => item.category === category && item.fiscalYear === fiscalYear
    );
  };

  const getFilteredTotalRevenuesData = () => {
    return totalRevenuesData.filter(
      (item) => item.budgetActual === 'Actual Receipts'
    );
  };

  const sortedRevenueData = getFilteredRevenueData().sort(
    (a, b) => b.amount - a.amount
  );

  const { theme, setTheme, resolvedTheme } = useTheme();

  const isDarkMode =
    resolvedTheme === 'dark' ||
    (resolvedTheme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div>
      <div>
        <center>
          <label style={{ marginRight: '10px' }}>Category:</label>{' '}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ color: 'black', marginRight: '10px' }}
          >
            <option value='General Fund'>General Fund Receipts</option>
            <option value='Special Funds'>Special Fund Receipts</option>
          </select>
          <label style={{ marginRight: '10px' }}>Fiscal Year:</label>
          <select
            value={fiscalYear}
            onChange={(e) => setFiscalYear(parseInt(e.target.value))}
            style={{ color: 'black' }}
          >
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
            <option value={2019}>2019</option>
            <option value={2018}>2018</option>
            <option value={2017}>2017</option>
            <option value={2016}>2016</option>
            <option value={2015}>2015</option>
            <option value={2014}>2014</option>
            <option value={2013}>2013</option>
            <option value={2012}>2012</option>
          </select>
        </center>

        <div className='chart-container'>
          <div>
            <h2>Revenue Sources</h2>
            <Bar
              data={{
                labels: sortedRevenueData.map((item) => item.revenueSource),
                datasets: [
                  {
                    label: 'Amount',
                    data: sortedRevenueData.map((item) => item.amount),
                    backgroundColor: '#41ffca',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                indexAxis: 'y',
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      color: isDarkMode ? 'white' : '#222',
                    },
                    title: {
                      display: true,
                      text: 'Amount',
                      color: isDarkMode ? 'white' : '#222',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: 'text-white dark:text-white',
                    },
                    title: {
                      display: true,
                      text: 'Revenue Source',
                      color: isDarkMode ? 'white' : '#222',
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: isDarkMode ? 'white' : '#222',
                    },
                  },
                },
              }}
            />
          </div>
          <div>
            <h2>Revenues Over Time</h2>
            <Bar
              data={{
                labels: getFilteredTotalRevenuesData()
                  .map((item) => item.fiscalYear)
                  .reverse(), // Reverse the labels to display in descending order
                datasets: [
                  {
                    label: 'Actual Receipts',
                    data: getFilteredTotalRevenuesData()
                      .map((item) => item.totalRevenues)
                      .sort((a, b) => b - a), // Sort data in descending order
                    backgroundColor: '#41ffca',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                indexAxis: 'y',
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      color: isDarkMode ? 'white' : '#222',
                    },
                    title: {
                      display: true,
                      text: 'Amount',
                      color: isDarkMode ? 'white' : '#222',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: isDarkMode ? 'white' : '#222',
                    },
                    title: {
                      display: true,
                      text: 'Fiscal Year',
                      color: isDarkMode ? 'white' : '#222',
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: isDarkMode ? 'white' : '#222',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revenue;
