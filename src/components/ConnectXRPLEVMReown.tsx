'use client';
import React from 'react';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';

interface Props {
  onConnect?: () => void;
  connected?: boolean;
}

export default function ConnectXRPLEVMReown({ onConnect, connected }: Props) {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount({ namespace: 'eip155' });
  const { disconnect } = useDisconnect();

  function handleConnect() {
    if (!isConnected) {
      open({ view: 'Connect' });
    }
    if (onConnect) onConnect();
  }

  return (
    <div className="w-full bg-white/90 dark:bg-black/70 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-200 hover:scale-[1.02]">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Connect XRPL EVM</h2>
      {!isConnected ? (
        <button
          onClick={handleConnect}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow hover:from-green-600 hover:to-emerald-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Connect XRPL EVM (Reown)
        </button>
      ) : (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-green-600 dark:text-green-400 font-semibold mb-2 text-center">
            Connected to XRPL EVM (Reown)!
          </p>
          <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg text-gray-800 dark:text-gray-200">
            {address && address.slice(0, 6) + '...' + address.slice(-4)}
          </span>
          <button
            onClick={async () => { await disconnect(); }}
            className="mt-2 px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-all"
            title="Disconnect"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
