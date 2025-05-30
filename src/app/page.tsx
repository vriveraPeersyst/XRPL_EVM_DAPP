// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import ConnectXRPLSnap from '@/components/ConnectXRPLSnap';

export default function HomePage() {
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {!xrplAccount ? (
        <ConnectXRPLSnap onConnect={setXrplAccount} />
      ) : (
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Welcome,</h1>
          <p className="font-mono">{xrplAccount}</p>
          {/* Render your other components here */}
        </div>
      )}
    </main>
  );
}
