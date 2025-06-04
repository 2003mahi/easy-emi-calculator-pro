
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, BarChart3, GitCompare, Banknote } from 'lucide-react';

const TabNavigation: React.FC = () => {
  return (
    <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-xl p-2">
      <TabsTrigger value="calculator" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
        <Calculator className="w-4 h-4" />
        Calculator
      </TabsTrigger>
      <TabsTrigger value="charts" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
        <BarChart3 className="w-4 h-4" />
        Analysis
      </TabsTrigger>
      <TabsTrigger value="comparison" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
        <GitCompare className="w-4 h-4" />
        Compare
      </TabsTrigger>
      <TabsTrigger value="prepayment" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
        <Banknote className="w-4 h-4" />
        Prepayment
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
