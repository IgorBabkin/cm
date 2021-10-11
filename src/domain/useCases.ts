import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
import { AssetFilterOptions } from './assets/AssetFilterOptions';
import { Asset, isAssetValid } from './assets/Asset';
import { isMetricValid, Metric } from './metrics/Metric';
import { MetricFilterOptions } from './metrics/MetricFilterOptions';

export const createAssetFilter = () => new BehaviorSubject<AssetFilterOptions>({ searchText: '' });

export const updateAssetFilter = (
  filter$: BehaviorSubject<AssetFilterOptions>,
  options: Partial<AssetFilterOptions>,
) => {
  filter$.next({ ...filter$.getValue(), ...options });
};

export const resetAssetFilter = (filter$: Subject<AssetFilterOptions>) => {
  filter$.next({ searchText: '' });
};

export const filterAssets = (
  list$: Observable<Asset[]>,
  options$: Observable<AssetFilterOptions>,
): Observable<Asset[]> => {
  return combineLatest([list$, options$]).pipe(map(([list, options]) => list.filter(isAssetValid(options))));
};

export const createMetricFilter = () => new BehaviorSubject<MetricFilterOptions>({ searchText: '' });

export const updateMetricFilter = (
  filter$: BehaviorSubject<MetricFilterOptions>,
  options: Partial<MetricFilterOptions>,
) => {
  filter$.next({ ...filter$.getValue(), ...options });
};

export const resetMetricFilter = (filter$: Subject<MetricFilterOptions>) => {
  filter$.next({ searchText: '' });
};

export const filterMetrics = (
  list$: Observable<Metric[]>,
  options$: Observable<MetricFilterOptions>,
): Observable<Metric[]> => {
  return combineLatest([list$, options$]).pipe(map(([list, options]) => list.filter(isMetricValid(options))));
};

export const resetAllFilters = (
  assetFilter$: Subject<AssetFilterOptions>,
  metricFilter$: Subject<MetricFilterOptions>,
) => {
  assetFilter$.next({ searchText: '' });
  metricFilter$.next({ searchText: '' });
};
