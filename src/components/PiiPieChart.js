import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to group entities into categories
const categorizeEntities = (entities) => {
  const categories = {
    'Government Documents': [
      'SSN', 'AADHAAR', 'DRIVING_LICENSE', 'DRIVER_ID', 
      'IN_AADHAAR', 'IN_NREGA', 'IN_PERMANENT_ACCOUNT_NUMBER', 
      'IN_VOTER_NUMBER', 'UK_NATIONAL_HEALTH_SERVICE_NUMBER', 
      'UK_NATIONAL_INSURANCE_NUMBER', 'UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER'
    ],
    Financial: [
      'CREDIT_CARD', 'CREDIT_DEBIT_CVV', 'CREDIT_DEBIT_EXPIRY', 
      'CREDIT_DEBIT_NUMBER', 'INTERNATIONAL_BANK_ACCOUNT_NUMBER', 
      'BANK_ACCOUNT_NUMBER', 'BANK_ROUTING', 'SWIFT_CODE'
    ],
    Personal: [
      'PERSON', 'GPE', 'EMAIL', 'ADDRESS', 'PHONE', 
      'MAC_ADDRESS', 'PASSWORD', 'PIN', 'URL', 
      'VEHICLE_IDENTIFICATION_NUMBER', 'CA_SOCIAL_INSURANCE_NUMBER'
    ],
    Medical: [
      'CA_HEALTH_NUMBER'
    ],
    Identification: [
      'PASSPORT_NUMBER', 'US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER',
      'IN_VOTER_NUMBER', 'DRIVER_ID'
    ],
    DateTime: [
      'DATE', 'TIME', 'DATE_TIME', 'AGE'
    ],
    Location: [
      'IP_ADDRESS', 'LICENSE_PLATE', 'ADDRESS'
    ],
    Other: [
      'MAC_ADDRESS', 'URL', 'PHONE'
    ]
  };

  const categoryCounts = {
    'Government Documents': 0,
    Financial: 0,
    Personal: 0,
    Medical: 0,
    Identification: 0,
    DateTime: 0,
    Location: 0,
    Other: 0
  };

  entities.forEach((entity) => {
    const entityType = entity.type;
    let found = false;
    for (const [category, types] of Object.entries(categories)) {
      if (types.includes(entityType)) {
        categoryCounts[category] += 1;
        found = true;
        break;
      }
    }
    if (!found) {
      categoryCounts['Other'] += 1;
    }
  });

  return categoryCounts;
};

const PiiPieChart = ({ entities }) => {
  const categoryCounts = categorizeEntities(entities);

  // Prepare data for the pie chart
  const data = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: '# of Entities',
        data: Object.values(categoryCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 1)', // Government Documents
          'rgba(54, 162, 235, 1)', // Financial
          'rgba(255, 206, 86, 1)', // Personal
          'rgba(75, 192, 192, 1)', // Medical
          'rgba(153, 102, 255, 1)', // Identification
          'rgba(255, 159, 64, 1)', // DateTime
          'rgba(199, 199, 199, 1)', // Location
          'rgba(255, 99, 132, 0.5)' // Other
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(255, 99, 132, 0.5)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom aspect ratio
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF', // Set legend text color to white
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
        bodyColor: '#FFFFFF', // Set tooltip text color to white
        titleColor: '#FFFFFF', // Set tooltip title color to white
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PiiPieChart;
