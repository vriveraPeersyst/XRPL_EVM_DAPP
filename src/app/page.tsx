// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import ConnectXRPLSnap from '@/components/ConnectXRPLSnap';
import ConnectXRPLEVMReown from '@/components/ConnectXRPLEVMReown';
// Removed Nav import

export default function HomePage() {
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);
  const [reownConnected, setReownConnected] = useState(false);

  const handleConnectReown = () => {
    // TODO: Replace with actual Reown connect logic/modal
    setReownConnected(true);
    setTimeout(() => setReownConnected(false), 2500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-black dark:via-gray-900 dark:to-gray-950 transition-colors">
      {/* Remove <Nav /> here to avoid duplicate nav/logo */}
      {reownConnected && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          Connected to XRPL EVM (Reown)!
        </div>
      )}
      {!xrplAccount ? (
        <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-3xl">
          <ConnectXRPLSnap onConnect={setXrplAccount} />
          <div className="hidden md:block h-48 w-px bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="block md:hidden w-full h-px bg-gray-300 dark:bg-gray-700 my-4" />
          <ConnectXRPLEVMReown onConnect={handleConnectReown} connected={reownConnected} />
        </div>
      ) : (
        <div className="max-w-md w-full bg-white/80 dark:bg-black/60 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-800 backdrop-blur">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome,</h1>
          <p className="font-mono text-lg text-blue-700 dark:text-blue-300 break-all">{xrplAccount}</p>
          {/* Render your other components here */}
        </div>
      )}
    </main>
  );
}
