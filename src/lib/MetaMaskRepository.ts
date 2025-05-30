// src/lib/MetaMaskRepository.ts
import type { MetaMaskInpageProvider } from '@metamask/providers';
import { getSnapsProvider } from '../utils/metamask';
import { SNAP_ORIGIN } from '../config/snap';

export class MetaMaskRepository {
  public provider: MetaMaskInpageProvider | null = null;

  /** Must be called before any other method */
  public async onInit(): Promise<void> {
    this.provider = await getSnapsProvider();
    if (!this.provider) {
      throw new Error('MetaMask with Snaps not found');
    }
  }

  /** Request installation of the XRPL Snap */
  public async requestSnap(): Promise<void> {
    if (!this.provider) throw new Error('Provider not initialized');
    await this.provider.request({
      method: 'wallet_requestSnaps',
      params: { [SNAP_ORIGIN]: {} },
    });
  }

  /** Retrieve XRPL account object from the Snap */
  public async getWallet(): Promise<{ account: string } | null> {
    const result = await this.invokeSnap({
      method: 'xrpl_getAccount',
      params: undefined,
    });
    if (result && typeof result === 'object' && 'account' in result) {
      return result as { account: string };
    }
    return null;
  }

  /** Fetch on-ledger account info (e.g. balances) */
  public async getAccountInfo(account: string): Promise<any> {
    const res = (await this.invokeSnap({
      method: 'xrpl_request',
      params: { command: 'account_info', account },
    })) as { result: { account_data?: any } };
    if (res.result?.account_data) {
      return res.result.account_data;
    }
    throw new Error('Account not found');
  }

  /** Internal helper to invoke the Snap API */
  private async invokeSnap(opts: {
    method: string;
    params: any;
  }): Promise<unknown> {
    if (!this.provider) throw new Error('Provider not initialized');
    return this.provider.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: SNAP_ORIGIN,
        request: {
          method: opts.method,
          params: opts.params,
        },
      },
    });
  }
}
