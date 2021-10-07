import { IMetricsRepository } from '../application/domain/assets/IMetricsRepository';
import { IMetric } from '../application/domain/assets/IMetric';
import { Metric } from '../application/domain/assets/Metric';

export class StubMetricsRepository implements IMetricsRepository {
  fetchAll(): Promise<IMetric[]> {
    const response = {
      data: [
        {
          metric: 'AdrActCnt',
          full_name: 'Addresses, active, count',
          description:
            'The sum count of unique addresses that were active in the network (either as a recipient or originator of a ledger change) that interval. All parties in a ledger change action (recipients and originators) are counted. Individual addresses are not double-counted if previously active.',
          category: 'Addresses',
          subcategory: 'Active',
          unit: 'Addresses',
          data_type: 'bigint',
          frequencies: [
            {
              frequency: '1b',
              assets: ['btc', 'eth'],
            },
            {
              frequency: '1d',
              assets: ['ada', 'btc', 'eth'],
            },
          ],
        },
        {
          metric: 'FlowInBFXNtv',
          full_name: 'Flow, in, to Bitfinex, native units',
          description: 'The sum in native units sent to Bitfinex that interval.',
          category: 'Exchange',
          subcategory: 'Deposits',
          unit: 'Native units',
          data_type: 'decimal',
          frequencies: [
            {
              frequency: '1b',
              assets: ['btc', 'eth'],
            },
            {
              frequency: '1d',
              assets: ['btc', 'eth'],
            },
          ],
          reviewable: true,
        },
      ],
    };
    return Promise.resolve([
      new Metric({
        name: 'AdrActCnt',
        title: 'Addresses, active, count',
        assets: ['btc', 'eth', 'ada'],
      }),
      new Metric({
        name: 'FlowInBFXNtv',
        title: 'Flow, in, to Bitfinex, native units',
        assets: ['btc', 'eth'],
      }),
    ]);
  }
}
