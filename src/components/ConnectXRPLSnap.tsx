// src/components/ConnectXRPLSnap.tsx
'use client';
import React, { useState } from 'react';
import { MetaMaskRepository } from '../lib/MetaMaskRepository';

interface Props {
  onConnect: (xrplAccount: string) => void;
}

export default function ConnectXRPLSnap({ onConnect }: Props) {
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
    <div>
      {!connected ? (
        <button
          onClick={connect}
          className="btn btn-primary"
        >
          Connect XRPL MetaMask Snap
        </button>
      ) : (
        <p>Connected XRPL: {xrplAccount}</p>
      )}
      {error && <p className="text-error mt-2">{error}</p>}
    </div>
  );
}
