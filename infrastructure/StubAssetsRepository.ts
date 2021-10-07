import { IAssetsRepository } from '../application/domain/assets/IAssetsRepository';
import { IAsset } from '../application/domain/assets/IAsset';
import { Asset } from '../application/domain/assets/Asset';

export class StubAssetsRepository implements IAssetsRepository {
  fetchAll(): Promise<IAsset[]> {
    const response = {
      data: [
        {
          asset: 'btc',
          full_name: 'Bitcoin',
          metrics: [
            {
              metric: 'AdrActCnt',
              frequencies: [
                {
                  frequency: '1b',
                  min_time: '2009-01-03T18:15:05.000000000Z',
                  max_time: '2020-06-08T20:22:17.000000000Z',
                  min_height: '0',
                  max_height: '633762',
                  min_hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
                  max_hash: '0000000000000000001103d90edd76573342cf3e2ff2453f8acf4d02fe91a32a',
                },
                {
                  frequency: '1d',
                  min_time: '2009-01-03T00:00:00.000000000Z',
                  max_time: '2020-06-07T00:00:00.000000000Z',
                  community: true,
                },
              ],
            },
            {
              metric: 'FlowInBFXUSD',
              frequencies: [
                {
                  frequency: '1b',
                  min_time: '2009-01-03T18:15:05.000000000Z',
                  max_time: '2020-06-08T20:37:31.000000000Z',
                  min_height: '0',
                  max_height: '633763',
                  min_hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
                  max_hash: '000000000000000000111614e0f5305dd4b16ca75cf4be433f58836eecf76929',
                },
                {
                  frequency: '1d',
                  min_time: '2010-07-18T00:00:00.000000000Z',
                  max_time: '2020-06-07T00:00:00.000000000Z',
                },
              ],
            },
          ],
          exchanges: ['binance', 'coinbase', 'kraken'],
          markets: [
            'binance-btc-usdt-spot',
            'binance-eth-btc-spot',
            'coinbase-btc-usd-spot',
            'coinbase-eth-btc-spot',
            'kraken-btc-usd-spot',
          ],
        },
        {
          asset: 'eth',
          full_name: 'Ethereum',
          metrics: [
            {
              metric: 'BlkSizeByte',
              frequencies: [
                {
                  frequency: '1b',
                  min_time: '1970-01-01T00:00:00.000000000Z',
                  max_time: '2020-06-08T20:44:27.000000000Z',
                  min_height: '0',
                  max_height: '10227342',
                  min_hash: 'd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3',
                  max_hash: '9358a17c8fa0aab1fb0dca61052764d85f36ae645a614e4d8531f43fcf264025',
                },
                {
                  frequency: '1d',
                  min_time: '2015-07-30T00:00:00.000000000Z',
                  max_time: '2020-06-07T00:00:00.000000000Z',
                  community: true,
                },
              ],
            },
            {
              metric: 'FlowInBFXUSD',
              frequencies: [
                {
                  frequency: '1b',
                  min_time: '1970-01-01T00:00:00.000000000Z',
                  max_time: '2020-06-08T20:44:27.000000000Z',
                  min_height: '0',
                  max_height: '10227342',
                  min_hash: 'd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3',
                  max_hash: '9358a17c8fa0aab1fb0dca61052764d85f36ae645a614e4d8531f43fcf264025',
                },
                {
                  frequency: '1d',
                  min_time: '2015-08-08T00:00:00.000000000Z',
                  max_time: '2020-06-07T00:00:00.000000000Z',
                },
              ],
            },
          ],
          exchanges: ['bitbank', 'coinbase', 'huobi', 'liquid'],
          markets: [
            'bitbank-eth-btc-spot',
            'huobi-eth-btc-spot',
            'huobi-eth-usdt-spot',
            'coinbase-eth-usd-spot',
            'coinbase-bat-eth-spot',
            'liquid-eth-usd-spot',
          ],
        },
      ],
    };
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
