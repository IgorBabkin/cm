import { Ticker } from '../assets/IAsset';
import { MetricFilterOptions } from './MetricFilterOptions';

export type MetricName = string;

export interface IMetricState {
  name: MetricName;
  title: string;
  assets: Ticker[];
}

const hasText = ({ name, title }: IMetricState, searchText: string): boolean => {
  const text = searchText.toLowerCase();
  return name.toLowerCase().search(text) !== -1 || title.toLowerCase().search(text) !== -1;
};

const hasAsset = ({ assets }: IMetricState, ticker: Ticker): boolean => {
  return assets.includes(ticker);
};

export const isMetricValid =
  ({ ticker, searchText }: MetricFilterOptions) =>
  (item: IMetricState) =>
    (!ticker || hasAsset(item, ticker)) && (searchText.length === 0 || hasText(item, searchText));
