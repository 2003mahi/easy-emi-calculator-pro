
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoanSummaryProps {
  principal: string;
  totalInterest: number;
  totalPayment: number;
  annualRate: string;
  tenureYears: string;
  formatCurrency: (amount: number) => string;
}

const LoanSummary: React.FC<LoanSummaryProps> = ({
  principal,
  totalInterest,
  totalPayment,
  annualRate,
  tenureYears,
  formatCurrency
}) => {
  return (
    <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800">Loan Summary</CardTitle>
        <CardDescription>Complete breakdown of your loan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-800 mb-1">Principal Amount</h4>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(parseFloat(principal) || 0)}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
            <h4 className="font-semibold text-gray-800 mb-1">Total Interest</h4>
            <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalInterest)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
            <h4 className="font-semibold text-gray-800 mb-1">Total Payment</h4>
            <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalPayment)}</p>
          </div>
        </div>

        {/* Loan Details */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-4">Loan Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Monthly Interest Rate:</span>
              <span className="font-semibold ml-2">{(parseFloat(annualRate) / 12).toFixed(3)}%</span>
            </div>
            <div>
              <span className="text-gray-600">Total Months:</span>
              <span className="font-semibold ml-2">{parseFloat(tenureYears) * 12} months</span>
            </div>
            <div>
              <span className="text-gray-600">Interest to Principal Ratio:</span>
              <span className="font-semibold ml-2">{((totalInterest / (parseFloat(principal) || 1)) * 100).toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-gray-600">EMI to Income Ratio:</span>
              <span className="font-semibold ml-2 text-orange-600">Keep under 40%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanSummary;
