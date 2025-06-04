
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AmortizationChart from '@/components/AmortizationChart';
import LoanComparison from '@/components/LoanComparison';
import PrepaymentCalculator from '@/components/PrepaymentCalculator';
import AppHeader from '@/components/AppHeader';
import TabNavigation from '@/components/TabNavigation';
import LoanInputForm from '@/components/LoanInputForm';
import LoanResults from '@/components/LoanResults';
import LoanSummary from '@/components/LoanSummary';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';

const Index = () => {
  const {
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
  } = useLoanCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AppHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="calculator" className="space-y-8">
          <TabNavigation />

          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-2 gap-8">
              <LoanInputForm
                principal={principal}
                setPrincipal={setPrincipal}
                annualRate={annualRate}
                setAnnualRate={setAnnualRate}
                tenureYears={tenureYears}
                setTenureYears={setTenureYears}
                onCalculate={calculateEMI}
                onExport={exportAmortizationSchedule}
              />

              <div className="space-y-6">
                <LoanResults
                  emi={emi}
                  tenureYears={tenureYears}
                  formatCurrency={formatCurrency}
                />

                <LoanSummary
                  principal={principal}
                  totalInterest={totalInterest}
                  totalPayment={totalPayment}
                  annualRate={annualRate}
                  tenureYears={tenureYears}
                  formatCurrency={formatCurrency}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="charts">
            <AmortizationChart
              principal={parseFloat(principal) || 0}
              annualRate={parseFloat(annualRate) || 0}
              tenureYears={parseFloat(tenureYears) || 0}
              emi={emi}
            />
          </TabsContent>

          <TabsContent value="comparison">
            <LoanComparison />
          </TabsContent>

          <TabsContent value="prepayment">
            <PrepaymentCalculator
              principal={parseFloat(principal) || 0}
              annualRate={parseFloat(annualRate) || 0}
              tenureYears={parseFloat(tenureYears) || 0}
              emi={emi}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
