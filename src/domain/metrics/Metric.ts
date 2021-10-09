import { Asset, Ticker } from '../assets/Asset';
import { MetricFilterOptions } from './MetricFilterOptions';

export type MetricName = string;

export interface Metric {
  name: MetricName;
  description: string;
  assets: Ticker[];
}

const hasText = ({ name, description }: Metric, searchText: string): boolean => {
  const text = searchText.toLowerCase();
  return name.toLowerCase().search(text) !== -1 || description.toLowerCase().search(text) !== -1;
};

const hasAsset = ({ assets }: Metric, ticker: Ticker): boolean => {
  return assets.includes(ticker);
};

export const isMetricValid =
  ({ ticker, searchText }: MetricFilterOptions) =>
  (item: Metric) =>
    (!ticker || hasAsset(item, ticker)) && (searchText.length === 0 || hasText(item, searchText));

export const byName = (a: Metric, b: Metric) => a.name.localeCompare(b.name);
