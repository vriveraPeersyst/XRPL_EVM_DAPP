// src/components/ConnectXRPLSnap.tsx
'use client';
import React, { useState } from 'react';
import { MetaMaskRepository } from '../lib/MetaMaskRepository';

interface Props {
  onConnect: (xrplAccount: string) => void;
  onDisconnect?: () => void;
}

export default function ConnectXRPLSnap({ onConnect, onDisconnect }: Props) {
  const [connected, setConnected] = useState(false);
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const repo = new MetaMaskRepository();

  const connect = async () => {
    try {
      await repo.onInit();

      // request EVM accounts
      const evmAccounts = (await repo.provider!.request({
        method: 'eth_requestAccounts',
      })) as string[];
      if (!evmAccounts.length) throw new Error('No EVM accounts found');

      // install the XRPL Snap
      await repo.requestSnap();

      // fetch the XRPL account
      const wallet = await repo.getWallet();
      if (!wallet?.account) throw new Error('XRPL account not returned');

      // optional: fetch on-ledger info
      await repo.getAccountInfo(wallet.account);

      setXrplAccount(wallet.account);
      setConnected(true);
      onConnect(wallet.account);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Unknown error');
    }
  };

  // XRPL Snap disconnect: just clear state (no real disconnect in MetaMask Snap)
  const disconnect = () => {
    setConnected(false);
    setXrplAccount(null);
    setError(null);
    if (onDisconnect) onDisconnect();
  };

  return (
    <div className="w-full bg-white/90 dark:bg-black/70 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-200 hover:scale-[1.02]">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Connect XRPL Snap</h2>
      {!connected ? (
        <button
          onClick={connect}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Connect XRPL MetaMask Snap
        </button>
      ) : (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-green-600 dark:text-green-400 font-semibold mb-2 text-center">
            Connected to XRPL to MetaMask!
          </p>
          <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg text-gray-800 dark:text-gray-200">
            {xrplAccount && xrplAccount.slice(0, 6) + '...' + xrplAccount.slice(-4)}
          </span>
          <button
            onClick={disconnect}
            className="mt-2 px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-all"
            title="Disconnect"
          >
            Disconnect
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}
