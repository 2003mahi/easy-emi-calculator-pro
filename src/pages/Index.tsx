
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, DollarSign, Calendar, Percent, TrendingUp } from 'lucide-react';

const Index = () => {
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

  useEffect(() => {
    calculateEMI();
  }, [principal, annualRate, tenureYears]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EMI Calculator Pro</h1>
              <p className="text-gray-600">Calculate your loan EMI with precision</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
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

              <Button 
                onClick={calculateEMI}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate EMI
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Main EMI Result */}
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

            {/* Loan Summary */}
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

            {/* EMI Formula */}
            <Card className="bg-white shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">EMI Formula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-center font-mono text-lg">
                    <div className="mb-2">EMI = P × R × (1 + R)^N</div>
                    <div className="border-t border-gray-300 pt-2">((1 + R)^N - 1)</div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p><strong>P:</strong> Principal loan amount</p>
                    <p><strong>R:</strong> Monthly interest rate (Annual rate ÷ 12 ÷ 100)</p>
                    <p><strong>N:</strong> Total number of monthly installments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
