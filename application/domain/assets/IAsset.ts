import { MetricName } from '../metrics/IMetric';

export type Ticker = string;

export interface IAssetState {
  ticker: Ticker;
  title: string;
  metrics: MetricName[];
}

export interface IAsset extends IAssetState {
  hasMetric(metric: MetricName): unknown;

  hasText(searchText: string): boolean;
}
