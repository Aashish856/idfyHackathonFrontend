import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Plots = ({ entities }) => {
  // Function to get frequency of each entity type
  const getEntityTypeFrequency = (entities) => {
    return entities.reduce((acc, entity) => {
      const type = entity.type;
      if (acc[type]) {
        acc[type] += 1;
      } else {
        acc[type] = 1;
      }
      return acc;
    }, {});
  };

  // Get the frequencies
  const frequencies = getEntityTypeFrequency(entities);

  // Prepare data for the bar chart
  const data = {
    labels: Object.keys(frequencies),
    datasets: [
      {
        label: 'Frequency',
        data: Object.values(frequencies),
        backgroundColor: '#D6143D',
        borderColor: '#D6143D',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable default aspect ratio management
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF', // Set legend text color to white
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
        bodyColor: '#FFFFFF', // Set tooltip text color to white
        titleColor: '#FFFFFF', // Set tooltip title color to white
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#FFFFFF', // Set x-axis labels color to white
        },
        grid: {
          color: '#333333', // Optional: Set x-axis grid lines color (for better contrast)
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#FFFFFF', // Set y-axis labels color to white
        },
        grid: {
          color: '#333333', // Optional: Set y-axis grid lines color (for better contrast)
        },
      },
    },
  };
  

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <Bar data={data} options={options} />
    </div>

  );
};

export default Plots;
