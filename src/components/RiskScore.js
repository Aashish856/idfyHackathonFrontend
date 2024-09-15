import React from 'react';

// Helper function to calculate the risk score
const calculateRiskScore = (entities) => {
  // Define sensitivity weights for each PII type
  const sensitivityWeights = {
    'SSN': 20,
    'AADHAAR': 20,
    'CREDIT_CARD': 20,
    'DRIVING_LICENSE': 15,
    'EMAIL': 10,
    'PHONE': 10,
    'PERSON': 5,
    'ADDRESS': 10,
    'DATE': 5,
    'TIME': 5,
    'URL': 5,
    'CA_HEALTH_NUMBER': 20,
    'IN_AADHAAR': 20,
    'IN_NREGA': 15,
    'IN_PERMANENT_ACCOUNT_NUMBER': 20,
    'IN_VOTER_NUMBER': 15,
    'UK_NATIONAL_HEALTH_SERVICE_NUMBER': 20,
    'UK_NATIONAL_INSURANCE_NUMBER': 20,
    'UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER': 20,
    'BANK_ACCOUNT_NUMBER': 20,
    'BANK_ROUTING': 15,
    'SWIFT_CODE': 15,
    'MAC_ADDRESS': 5,
    'PIN': 15,
    'CREDIT_DEBIT_CVV': 20,
    'CREDIT_DEBIT_EXPIRY': 15,
    'VEHICLE_IDENTIFICATION_NUMBER': 15,
    'IP_ADDRESS': 10,
    'LICENSE_PLATE': 10,
    'PASSWORD': 20,
    'US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER': 20,
    'PASSPORT_NUMBER': 20
  };

  // Initialize risk score
  let riskScore = 0;

  // Count occurrences of each PII type
  const counts = entities.reduce((acc, entity) => {
    const type = entity.type;
    if (sensitivityWeights[type]) {
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {});

  // Calculate risk score based on sensitivity weights and occurrences
  for (const [type, count] of Object.entries(counts)) {
    riskScore += sensitivityWeights[type] * count;
  }

  // Normalize risk score to be within 0-100
  const maxPossibleScore = Object.values(sensitivityWeights).reduce((acc, weight) => acc + weight, 0) * 10;
  const normalizedRiskScore = Math.min((riskScore / maxPossibleScore) * 100, 100);

  return normalizedRiskScore;
};

// RiskScore Component
const RiskScore = ({ entities }) => {
  const riskScore = calculateRiskScore(entities);

  return (
      <p className='m-0'>{riskScore.toFixed(2)} / 100</p>
  );
};

export default RiskScore;
