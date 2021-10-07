import { Observable } from 'rxjs';
import { IMetric } from './IMetric';
import { Ticker } from './IAsset';

export type MetricListFilterOptions = { searchText: string; ticker?: Ticker };
export const IMetricListKey = Symbol.for('IMetricList');

export interface IMetricList {
  setItems(items: IMetric[]): void;

  getItems$(): Observable<IMetric[]>;

  resetFilter(): void;

  getFilterOptions$(): Observable<MetricListFilterOptions>;

  updateFilter(options: Partial<MetricListFilterOptions>): void;
}
