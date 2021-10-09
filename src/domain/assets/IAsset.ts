import { MetricName } from '../metrics/IMetric';
import { AssetFilterOptions } from './AssetFilterOptions';

export type Ticker = string;

export interface IAssetState {
  ticker: Ticker;
  title: string;
  metrics: MetricName[];
}

const hasText = ({ ticker, title }: IAssetState, searchText: string): boolean => {
  const text = searchText.toLowerCase();
  return ticker.toLowerCase().search(text) !== -1 || title.toLowerCase().search(text) !== -1;
};

const hasMetric = ({ metrics }: IAssetState, metric: MetricName): boolean => {
  return metrics.includes(metric);
};

export const isAssetValid =
  ({ metric, searchText }: AssetFilterOptions) =>
  (item: IAssetState) =>
    (!metric || hasMetric(item, metric)) && (searchText.length === 0 || hasText(item, searchText));
