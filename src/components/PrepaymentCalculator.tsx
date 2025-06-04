
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Banknote, Clock, DollarSign, TrendingDown } from 'lucide-react';

interface PrepaymentCalculatorProps {
  principal: number;
  annualRate: number;
  tenureYears: number;
  emi: number;
}

const PrepaymentCalculator: React.FC<PrepaymentCalculatorProps> = ({
  principal,
  annualRate,
  tenureYears,
  emi
}) => {
  const [prepaymentAmount, setPrepaymentAmount] = useState<string>('100000');
  const [prepaymentMonth, setPrepaymentMonth] = useState<string>('12');
  const [results, setResults] = useState({
    newTenure: 0,
    interestSaved: 0,
    timeSaved: 0,
    newEmi: 0
  });

  const calculatePrepaymentImpact = () => {
    const prepayment = parseFloat(prepaymentAmount) || 0;
    const prepaymentMonthNum = parseInt(prepaymentMonth) || 1;
    const monthlyRate = annualRate / (12 * 100);
    const totalMonths = tenureYears * 12;

    if (prepayment <= 0 || prepaymentMonthNum <= 0) {
      setResults({ newTenure: 0, interestSaved: 0, timeSaved: 0, newEmi: 0 });
      return;
    }

    // Calculate remaining balance at prepayment month
    let remainingBalance = principal;
    for (let month = 1; month < prepaymentMonthNum; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingBalance = remainingBalance - principalPayment;
    }

    // Apply prepayment
    const newPrincipal = Math.max(0, remainingBalance - prepayment);
    
    if (newPrincipal <= 0) {
      setResults({
        newTenure: prepaymentMonthNum,
        interestSaved: 0,
        timeSaved: totalMonths - prepaymentMonthNum,
        newEmi: 0
      });
      return;
    }

    // Calculate new tenure with same EMI
    const newTotalMonths = Math.ceil(
      Math.log(1 + (newPrincipal * monthlyRate) / emi) / Math.log(1 + monthlyRate)
    );

    const actualNewTenure = prepaymentMonthNum + newTotalMonths;
    const timeSavedMonths = totalMonths - actualNewTenure;

    // Calculate interest saved
    const originalTotalInterest = (emi * totalMonths) - principal;
    
    // Calculate new total interest
    let newTotalInterest = 0;
    let balance = newPrincipal;
    for (let month = 1; month <= newTotalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      newTotalInterest += interestPayment;
      const principalPayment = emi - interestPayment;
      balance = Math.max(0, balance - principalPayment);
    }

    // Add interest paid before prepayment
    let interestBeforePrepayment = 0;
    let tempBalance = principal;
    for (let month = 1; month < prepaymentMonthNum; month++) {
      const interestPayment = tempBalance * monthlyRate;
      interestBeforePrepayment += interestPayment;
      const principalPayment = emi - interestPayment;
      tempBalance = tempBalance - principalPayment;
    }

    const totalNewInterest = interestBeforePrepayment + newTotalInterest;
    const interestSaved = originalTotalInterest - totalNewInterest;

    setResults({
      newTenure: actualNewTenure,
      interestSaved: Math.max(0, interestSaved),
      timeSaved: Math.max(0, timeSavedMonths),
      newEmi: emi
    });
  };

  useEffect(() => {
    calculatePrepaymentImpact();
  }, [prepaymentAmount, prepaymentMonth, principal, annualRate, tenureYears, emi]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Banknote className="w-6 h-6" />
          Prepayment Calculator
        </CardTitle>
        <CardDescription className="text-emerald-100">
          See how prepaying your loan can save you time and money
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Input Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Prepayment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="prepaymentAmount" className="text-base font-medium">
                Prepayment Amount (₹)
              </Label>
              <Input
                id="prepaymentAmount"
                type="number"
                value={prepaymentAmount}
                onChange={(e) => setPrepaymentAmount(e.target.value)}
                className="text-lg p-4 mt-2"
                placeholder="Enter prepayment amount"
              />
              <p className="text-sm text-gray-600 mt-1">Amount you plan to prepay</p>
            </div>
            <div>
              <Label htmlFor="prepaymentMonth" className="text-base font-medium">
                Prepayment Month
              </Label>
              <Input
                id="prepaymentMonth"
                type="number"
                value={prepaymentMonth}
                onChange={(e) => setPrepaymentMonth(e.target.value)}
                className="text-lg p-4 mt-2"
                placeholder="Enter month number"
                min="1"
                max={tenureYears * 12}
              />
              <p className="text-sm text-gray-600 mt-1">Month when you'll make the prepayment</p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">New Loan Tenure</h4>
                <p className="text-xl font-bold text-blue-600">
                  {formatMonths(results.newTenure)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Time Saved</h4>
                <p className="text-xl font-bold text-green-600">
                  {formatMonths(results.timeSaved)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Interest Saved</h4>
                <p className="text-xl font-bold text-orange-600">
                  {formatCurrency(results.interestSaved)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">EMI Remains</h4>
                <p className="text-xl font-bold text-purple-600">
                  {formatCurrency(results.newEmi)}
                </p>
              </div>
              <Banknote className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Summary */}
        {results.interestSaved > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-start gap-3">
              <Badge className="bg-green-500 mt-1">💡 Smart Move!</Badge>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Prepayment Benefits</h4>
                <p className="text-green-700">
                  By prepaying {formatCurrency(parseFloat(prepaymentAmount) || 0)} in month {prepaymentMonth}, 
                  you'll save {formatCurrency(results.interestSaved)} in interest and complete your loan 
                  {formatMonths(results.timeSaved)} earlier!
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrepaymentCalculator;
