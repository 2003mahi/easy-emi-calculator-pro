
import { useState, useEffect } from 'react';

export const useLoanCalculator = () => {
  const [principal, setPrincipal] = useState<string>('500000');
  const [annualRate, setAnnualRate] = useState<string>('10');
  const [tenureYears, setTenureYears] = useState<string>('20');
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const annualInterestRate = parseFloat(annualRate);
    const years = parseFloat(tenureYears);

    if (P <= 0 || annualInterestRate < 0 || years <= 0) {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    // Convert annual rate to monthly rate (decimal)
    const R = annualInterestRate / (12 * 100);
    // Convert years to months
    const N = years * 12;

    // EMI Formula: EMI = P * R * (1 + R)^N / ((1 + R)^N - 1)
    const numerator = P * R * Math.pow(1 + R, N);
    const denominator = Math.pow(1 + R, N) - 1;
    
    const calculatedEMI = numerator / denominator;
    const totalAmount = calculatedEMI * N;
    const totalInterestAmount = totalAmount - P;

    setEmi(calculatedEMI);
    setTotalPayment(totalAmount);
    setTotalInterest(totalInterestAmount);
  };

  const exportAmortizationSchedule = () => {
    const monthlyRate = parseFloat(annualRate) / (12 * 100);
    let remainingBalance = parseFloat(principal);
    const totalMonths = parseFloat(tenureYears) * 12;
    
    let csvContent = "Month,EMI,Principal,Interest,Balance\n";
    
    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);
      
      csvContent += `${month},${emi.toFixed(2)},${principalPayment.toFixed(2)},${interestPayment.toFixed(2)},${remainingBalance.toFixed(2)}\n`;
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amortization-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    calculateEMI();
  }, [principal, annualRate, tenureYears]);

  return {
    principal,
    setPrincipal,
    annualRate,
    setAnnualRate,
    tenureYears,
    setTenureYears,
    emi,
    totalPayment,
    totalInterest,
    calculateEMI,
    exportAmortizationSchedule,
    formatCurrency
  };
};
