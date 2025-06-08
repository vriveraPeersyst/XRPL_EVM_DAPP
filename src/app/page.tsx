// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import ConnectXRPLSnap from '@/components/ConnectXRPLSnap';
import ConnectXRPLEVMReown from '@/components/ConnectXRPLEVMReown';

export default function HomePage() {
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);
  const [reownConnected, setReownConnected] = useState(false);

  const handleConnectReown = () => {
    setReownConnected(true);
    setTimeout(() => setReownConnected(false), 2500);
  };

  const handleDisconnectXRPL = () => setXrplAccount(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-black dark:via-gray-900 dark:to-gray-950 transition-colors">
      {reownConnected && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          Connected to XRPL EVM (Reown)!
        </div>
      )}
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-3xl">
        <ConnectXRPLSnap onConnect={setXrplAccount} onDisconnect={handleDisconnectXRPL} />
        <div className="hidden md:block h-48 w-px bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="block md:hidden w-full h-px bg-gray-300 dark:bg-gray-700 my-4" />
        <ConnectXRPLEVMReown onConnect={handleConnectReown} connected={reownConnected} />
      </div>
    </main>
  );
}
