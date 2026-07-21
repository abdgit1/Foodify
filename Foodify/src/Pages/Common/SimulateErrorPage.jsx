import React, { useState } from 'react';
import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';
import { AlertOctagon, Zap } from 'lucide-react';

const BuggyComponent = () => {
  throw new Error('💥 Simulated Kitchen Emergency! React runtime error caught by ErrorBoundary.');
};

const SimulateErrorPage = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    return <BuggyComponent />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Error Boundary Simulation
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Click the button below to trigger a simulated React rendering crash and test how <code className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-mono text-xs">ErrorBoundary</code> catches it.
            </p>
          </div>

          <button
            onClick={() => setShouldCrash(true)}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Zap className="w-5 h-5 mr-2" />
            Trigger Simulated Crash
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SimulateErrorPage;
