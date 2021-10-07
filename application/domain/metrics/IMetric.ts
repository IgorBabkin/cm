import { Ticker } from '../assets/IAsset';

export type MetricName = string;

export interface IMetricState {
  name: MetricName;
  title: string;
  assets: Ticker[];
}

export interface IMetric extends IMetricState {
  hasAsset(ticker: Ticker): boolean;

  hasText(searchText: string): boolean;
}
