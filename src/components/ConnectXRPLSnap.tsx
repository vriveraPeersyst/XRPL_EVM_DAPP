// src/components/ConnectXRPLSnap.tsx
'use client';
import React, { useState } from 'react';
import { MetaMaskRepository } from '../lib/MetaMaskRepository';

interface Props {
  onConnect: (xrplAccount: string) => void;
  onConnectReown?: () => void;
}

export default function ConnectXRPLSnap({ onConnect, onConnectReown }: Props) {
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

  return (
    <div className="max-w-md w-full bg-white/80 dark:bg-black/60 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 border border-gray-200 dark:border-gray-800 backdrop-blur">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Connect Your Wallet</h2>
      {!connected ? (
        <>
          <button
            onClick={connect}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Connect XRPL MetaMask Snap
          </button>
          <div className="relative w-full flex items-center justify-center my-2">
            <span className="absolute left-0 right-0 border-t border-gray-300 dark:border-gray-700"></span>
            <span className="bg-white dark:bg-black px-2 text-gray-400 text-xs z-10">or</span>
          </div>
          <button
            onClick={onConnectReown}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow hover:from-green-600 hover:to-emerald-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Connect XRPL EVM (Reown)
          </button>
        </>
      ) : (
        <div className="w-full text-center">
          <p className="text-green-600 dark:text-green-400 font-semibold mb-2">Connected XRPL:</p>
          <p className="font-mono text-gray-800 dark:text-gray-200 break-all">{xrplAccount}</p>
        </div>
      )}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}
