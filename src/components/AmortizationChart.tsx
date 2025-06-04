
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AmortizationData {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  totalPayment: number;
}

interface AmortizationChartProps {
  principal: number;
  annualRate: number;
  tenureYears: number;
  emi: number;
}

const AmortizationChart: React.FC<AmortizationChartProps> = ({
  principal,
  annualRate,
  tenureYears,
  emi
}) => {
  const generateAmortizationData = (): AmortizationData[] => {
    const data: AmortizationData[] = [];
    const monthlyRate = annualRate / (12 * 100);
    let remainingBalance = principal;
    const totalMonths = tenureYears * 12;

    for (let month = 1; month <= Math.min(totalMonths, 60); month += 3) { // Show every 3rd month for readability
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);

      data.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
        totalPayment: emi
      });
    }

    return data;
  };

  const amortizationData = generateAmortizationData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{`Month ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Payment Breakdown Chart */}
      <Card className="bg-white shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Payment Breakdown Over Time
          </CardTitle>
          <CardDescription>
            See how your principal and interest payments change over the loan tenure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={amortizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="principal" stackId="a" fill="#3b82f6" name="Principal Payment" />
              <Bar dataKey="interest" stackId="a" fill="#ef4444" name="Interest Payment" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Outstanding Balance Chart */}
      <Card className="bg-white shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-green-600" />
            Outstanding Loan Balance
          </CardTitle>
          <CardDescription>
            Track how your loan balance decreases over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={amortizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                label={{ value: 'Balance', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Outstanding Balance"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmortizationChart;
