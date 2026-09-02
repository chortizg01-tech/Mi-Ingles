import React, { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-stretch sm:py-4">
      <main className="w-full max-w-md bg-slate-50 min-h-screen sm:min-h-[92vh] sm:rounded-3xl shadow-xl flex flex-col relative overflow-hidden border border-slate-200/80">
        {children}
      </main>
    </div>
  );
};
