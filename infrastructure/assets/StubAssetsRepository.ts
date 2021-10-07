import { IAssetsRepository } from '../../application/domain/assets/IAssetsRepository';
import { IAsset } from '../../application/domain/assets/IAsset';
import { Asset } from '../../application/domain/assets/Asset';

export class StubAssetsRepository implements IAssetsRepository {
  fetchAll(): Promise<IAsset[]> {
    return Promise.resolve([
      new Asset({
        ticker: 'btc',
        title: 'Bitcoin',
        metrics: ['AdrActCnt', 'FlowInBFXUSD'],
      }),
      new Asset({
        ticker: 'eth',
        title: 'Ethereum',
        metrics: ['BlkSizeByte', 'FlowInBFXUSD'],
      }),
    ]);
  }
}
