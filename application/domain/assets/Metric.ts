import { Ticker } from './IAsset';
import { IMetric, IMetricState, MetricName } from './IMetric';

export class Metric implements IMetric {
  assets: Ticker[];
  name: MetricName;
  title: string;

  constructor(state: IMetricState) {
    this.assets = state.assets;
    this.title = state.title;
    this.name = state.name;
  }

  hasAsset(ticker: Ticker): boolean {
    return this.assets.includes(ticker);
  }

  hasText(searchText: string): boolean {
    return this.name.toLowerCase().search(searchText) !== -1 || this.title.toLowerCase().search(searchText) !== -1;
  }
}