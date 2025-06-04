
import React from 'react';
import { Calculator } from 'lucide-react';

const AppHeader: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">EMI Calculator Pro</h1>
            <p className="text-gray-600">Advanced loan analysis with charts, comparisons & prepayment planning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
