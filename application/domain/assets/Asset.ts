import { MetricName } from '../metrics/IMetric';
import { IAsset, IAssetState, Ticker } from './IAsset';

export class Asset implements IAsset {
  metrics: MetricName[];
  ticker: Ticker;
  title: string;

  constructor(state: IAssetState) {
    this.metrics = state.metrics;
    this.ticker = state.ticker;
    this.title = state.title;
  }

  hasMetric(metric: MetricName): unknown {
    return this.metrics.includes(metric);
  }

  hasText(searchText: string): boolean {
    return this.title.toLowerCase().search(searchText) !== -1 || this.ticker.toLowerCase().search(searchText) !== -1;
  }
}
