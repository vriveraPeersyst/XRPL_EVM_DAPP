'use client';
import React from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

interface Props {
  onConnect?: () => void; // optional, for compatibility
  connected?: boolean;
}

export default function ConnectXRPLEVMReown({ onConnect, connected }: Props) {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount({ namespace: 'eip155' });

  function handleConnect() {
    if (!isConnected) {
      open({ view: 'Connect' });
    }
    if (onConnect) onConnect();
  }

  return (
    <div className="max-w-md w-full bg-white/80 dark:bg-black/60 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 border border-gray-200 dark:border-gray-800 backdrop-blur">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Connect XRPL EVM</h2>
      {!isConnected ? (
        <button
          onClick={handleConnect}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow hover:from-green-600 hover:to-emerald-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Connect XRPL EVM (Reown)
        </button>
      ) : (
        <div className="w-full text-center">
          <p className="text-green-600 dark:text-green-400 font-semibold mb-2">Connected to XRPL EVM (Reown)!</p>
        </div>
      )}
    </div>
  );
}
