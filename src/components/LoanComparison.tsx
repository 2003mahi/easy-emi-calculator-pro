
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Trash2, Award } from 'lucide-react';

interface LoanOption {
  id: number;
  name: string;
  principal: number;
  rate: number;
  tenure: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

const LoanComparison: React.FC = () => {
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
  const [newLoan, setNewLoan] = useState({
    name: '',
    principal: '',
    rate: '',
    tenure: ''
  });

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const R = rate / (12 * 100);
    const N = tenure * 12;
    const emi = (principal * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - principal;
    
    return { emi, totalPayment, totalInterest };
  };

  const addLoanOption = () => {
    if (!newLoan.name || !newLoan.principal || !newLoan.rate || !newLoan.tenure) return;

    const principal = parseFloat(newLoan.principal);
    const rate = parseFloat(newLoan.rate);
    const tenure = parseFloat(newLoan.tenure);

    const { emi, totalPayment, totalInterest } = calculateEMI(principal, rate, tenure);

    const loan: LoanOption = {
      id: Date.now(),
      name: newLoan.name,
      principal,
      rate,
      tenure,
      emi,
      totalPayment,
      totalInterest
    };

    setLoanOptions([...loanOptions, loan]);
    setNewLoan({ name: '', principal: '', rate: '', tenure: '' });
  };

  const removeLoanOption = (id: number) => {
    setLoanOptions(loanOptions.filter(loan => loan.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getBestOption = () => {
    if (loanOptions.length === 0) return null;
    return loanOptions.reduce((best, current) => 
      current.totalPayment < best.totalPayment ? current : best
    );
  };

  const bestOption = getBestOption();

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Loan Comparison Tool
        </CardTitle>
        <CardDescription className="text-purple-100">
          Compare different loan options to find the best deal
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* Add New Loan Form */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <h3 className="text-lg font-semibold mb-4">Add Loan Option</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <Label htmlFor="loanName">Loan Name</Label>
              <Input
                id="loanName"
                value={newLoan.name}
                onChange={(e) => setNewLoan({...newLoan, name: e.target.value})}
                placeholder="e.g., Bank A"
              />
            </div>
            <div>
              <Label htmlFor="loanPrincipal">Principal (₹)</Label>
              <Input
                id="loanPrincipal"
                type="number"
                value={newLoan.principal}
                onChange={(e) => setNewLoan({...newLoan, principal: e.target.value})}
                placeholder="500000"
              />
            </div>
            <div>
              <Label htmlFor="loanRate">Rate (%)</Label>
              <Input
                id="loanRate"
                type="number"
                step="0.1"
                value={newLoan.rate}
                onChange={(e) => setNewLoan({...newLoan, rate: e.target.value})}
                placeholder="10.5"
              />
            </div>
            <div>
              <Label htmlFor="loanTenure">Tenure (Years)</Label>
              <Input
                id="loanTenure"
                type="number"
                value={newLoan.tenure}
                onChange={(e) => setNewLoan({...newLoan, tenure: e.target.value})}
                placeholder="20"
              />
            </div>
            <Button onClick={addLoanOption} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Loan Options Comparison */}
        {loanOptions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Loan Comparison</h3>
            <div className="grid gap-4">
              {loanOptions.map((loan) => (
                <div 
                  key={loan.id} 
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    bestOption && loan.id === bestOption.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {bestOption && loan.id === bestOption.id && (
                    <Badge className="absolute -top-2 left-4 bg-green-500">
                      <Award className="w-3 h-3 mr-1" />
                      Best Option
                    </Badge>
                  )}
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 flex-1">
                      <div>
                        <p className="text-sm text-gray-600">Loan Name</p>
                        <p className="font-semibold">{loan.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Principal</p>
                        <p className="font-semibold">{formatCurrency(loan.principal)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rate</p>
                        <p className="font-semibold">{loan.rate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">EMI</p>
                        <p className="font-semibold text-blue-600">{formatCurrency(loan.emi)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Interest</p>
                        <p className="font-semibold text-orange-600">{formatCurrency(loan.totalInterest)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Payment</p>
                        <p className="font-semibold text-purple-600">{formatCurrency(loan.totalPayment)}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeLoanOption(loan.id)}
                      className="ml-4 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoanComparison;
