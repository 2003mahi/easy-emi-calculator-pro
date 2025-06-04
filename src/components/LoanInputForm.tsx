
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, DollarSign, Calendar, Percent, Download } from 'lucide-react';

interface LoanInputFormProps {
  principal: string;
  setPrincipal: (value: string) => void;
  annualRate: string;
  setAnnualRate: (value: string) => void;
  tenureYears: string;
  setTenureYears: (value: string) => void;
  onCalculate: () => void;
  onExport: () => void;
}

const LoanInputForm: React.FC<LoanInputFormProps> = ({
  principal,
  setPrincipal,
  annualRate,
  setAnnualRate,
  tenureYears,
  setTenureYears,
  onCalculate,
  onExport
}) => {
  return (
    <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Loan Details
        </CardTitle>
        <CardDescription className="text-blue-100">
          Enter your loan information to calculate EMI
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Principal Amount */}
        <div className="space-y-3">
          <Label htmlFor="principal" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Principal Amount (₹)
          </Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors"
            placeholder="Enter loan amount"
          />
          <p className="text-sm text-gray-600">The total amount you want to borrow</p>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <Label htmlFor="rate" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Percent className="w-5 h-5 text-green-600" />
            Annual Interest Rate (%)
          </Label>
          <Input
            id="rate"
            type="number"
            step="0.1"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            className="text-lg p-4 border-2 border-gray-200 focus:border-green-500 rounded-xl transition-colors"
            placeholder="Enter interest rate"
          />
          <p className="text-sm text-gray-600">Annual interest rate offered by the lender</p>
        </div>

        {/* Loan Tenure */}
        <div className="space-y-3">
          <Label htmlFor="tenure" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Loan Tenure (Years)
          </Label>
          <Input
            id="tenure"
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(e.target.value)}
            className="text-lg p-4 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-colors"
            placeholder="Enter loan tenure"
          />
          <p className="text-sm text-gray-600">Duration of the loan in years</p>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={onCalculate}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate EMI
          </Button>
          <Button
            onClick={onExport}
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 px-6 rounded-xl"
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanInputForm;
