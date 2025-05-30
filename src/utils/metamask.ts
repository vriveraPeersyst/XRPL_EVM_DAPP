// src/utils/metamask.ts
import type {
  MetaMaskInpageProvider,
  EIP6963AnnounceProviderEvent,
} from '@metamask/providers';

/** Check if provider supports Snaps. */
export async function hasSnapsSupport(
  provider: MetaMaskInpageProvider
): Promise<boolean> {
  try {
    await provider.request({ method: 'wallet_getSnaps' });
    return true;
  } catch {
    return false;
  }
}

/** Try EIP-6963 announceProvider to locate a MetaMask provider. */
export async function getMetaMaskEIP6963Provider(): Promise<
  MetaMaskInpageProvider | null
> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      window.removeEventListener(
        'eip6963:announceProvider',
        onAnnounce as any
      );
      resolve(null);
    }, 500);

    async function onAnnounce(evt: Event) {
      const ce = evt as CustomEvent<EIP6963AnnounceProviderEvent['detail']>;
      const detail = ce.detail;
      if (!detail) return;
      const { provider, info } = detail;
      if (
        info?.rdns?.includes('io.metamask') &&
        provider &&
        (await hasSnapsSupport(provider))
      ) {
        clearTimeout(timeout);
        window.removeEventListener(
          'eip6963:announceProvider',
          onAnnounce as any
        );
        resolve(provider);
      }
    }

    window.addEventListener(
      'eip6963:announceProvider',
      onAnnounce as any
    );
    window.dispatchEvent(new Event('eip6963:requestProvider'));
  });
}

/** Loop through known injection points to find the first snaps-capable provider. */
export async function getSnapsProvider(): Promise<
  MetaMaskInpageProvider | null
> {
  if (typeof window === 'undefined') return null;
  const anyWin = window as any;

  // 1) default injection
  if (
    anyWin.ethereum &&
    (await hasSnapsSupport(anyWin.ethereum as MetaMaskInpageProvider))
  ) {
    return anyWin.ethereum as MetaMaskInpageProvider;
  }

  // 2) window.ethereum.detected
  for (const p of anyWin.ethereum?.detected ?? []) {
    if (await hasSnapsSupport(p)) return p;
  }

  // 3) window.ethereum.providers
  for (const p of anyWin.ethereum?.providers ?? []) {
    if (await hasSnapsSupport(p)) return p;
  }

  // 4) EIP-6963 fallback
  const fromEIP = await getMetaMaskEIP6963Provider();
  if (fromEIP && (await hasSnapsSupport(fromEIP))) return fromEIP;

  return null;
}
