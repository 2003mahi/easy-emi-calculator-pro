
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface LoanResultsProps {
  emi: number;
  tenureYears: string;
  formatCurrency: (amount: number) => string;
}

const LoanResults: React.FC<LoanResultsProps> = ({
  emi,
  tenureYears,
  formatCurrency
}) => {
  return (
    <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Monthly EMI
          </h3>
          <div className="text-5xl font-bold mb-2">
            {formatCurrency(emi)}
          </div>
          <p className="text-green-100">Per month for {tenureYears} years</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanResults;
