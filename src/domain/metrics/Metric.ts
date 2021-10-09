import { Ticker } from '../assets/Asset';
import { MetricFilterOptions } from './MetricFilterOptions';

export type MetricName = string;

export interface Metric {
  name: MetricName;
  title: string;
  assets: Ticker[];
}

const hasText = ({ name, title }: Metric, searchText: string): boolean => {
  const text = searchText.toLowerCase();
  return name.toLowerCase().search(text) !== -1 || title.toLowerCase().search(text) !== -1;
};

const hasAsset = ({ assets }: Metric, ticker: Ticker): boolean => {
  return assets.includes(ticker);
};

export const isMetricValid =
  ({ ticker, searchText }: MetricFilterOptions) =>
  (item: Metric) =>
    (!ticker || hasAsset(item, ticker)) && (searchText.length === 0 || hasText(item, searchText));
