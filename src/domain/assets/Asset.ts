import { MetricName } from '../metrics/Metric';
import { AssetFilterOptions } from './AssetFilterOptions';

export type Ticker = string;

export interface Asset {
  ticker: Ticker;
  title: string;
  metrics: MetricName[];
}

const hasText = ({ ticker, title }: Asset, searchText: string): boolean => {
  const text = searchText.toLowerCase();
  return ticker.toLowerCase().search(text) !== -1 || title.toLowerCase().search(text) !== -1;
};

const hasMetric = ({ metrics }: Asset, metric: MetricName): boolean => {
  return metrics.includes(metric);
};

export const isAssetValid =
  ({ metric, searchText }: AssetFilterOptions) =>
  (item: Asset) =>
    (!metric || hasMetric(item, metric)) && (searchText.length === 0 || hasText(item, searchText));
