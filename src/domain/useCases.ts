import { BehaviorSubject, combineLatest, map, Observable, Subscription } from 'rxjs';
import { AssetFilterOptions } from './assets/AssetFilterOptions';
import { Asset, isAssetValid } from './assets/Asset';
import { isMetricValid, Metric } from './metrics/Metric';
import { MetricFilterOptions } from './metrics/MetricFilterOptions';
import { fetchAssets, fetchMetrics } from '../api/api';

export const createAssets = () => new BehaviorSubject<Asset[]>([]);
export const createAssetFilter = () => new BehaviorSubject<AssetFilterOptions>({ searchText: '' });

export const loadAssets = (list$: BehaviorSubject<Asset[]>): Subscription => fetchAssets().subscribe(list$);

export const updateAssetFilter = (
  filter$: BehaviorSubject<AssetFilterOptions>,
  options: Partial<AssetFilterOptions>,
) => {
  filter$.next({ ...filter$.getValue(), ...options });
};

export const resetAssetFilter = (filter$: BehaviorSubject<AssetFilterOptions>) => {
  filter$.next({ searchText: '' });
};

export const filterAssets = (
  list$: Observable<Asset[]>,
  options$: Observable<AssetFilterOptions>,
): Observable<Asset[]> => {
  return combineLatest([list$, options$]).pipe(map(([list, options]) => list.filter(isAssetValid(options))));
};

export const createMetrics = () => new BehaviorSubject<Metric[]>([]);
export const createMetricFilter = () => new BehaviorSubject<MetricFilterOptions>({ searchText: '' });

export const loadMetrics = (list$: BehaviorSubject<Metric[]>): Subscription => fetchMetrics().subscribe(list$);

export const updateMetricFilter = (
  filter$: BehaviorSubject<MetricFilterOptions>,
  options: Partial<MetricFilterOptions>,
) => {
  filter$.next({ ...filter$.getValue(), ...options });
};

export const resetMetricFilter = (filter$: BehaviorSubject<MetricFilterOptions>) => {
  filter$.next({ searchText: '' });
};

export const filterMetrics = (
  list$: Observable<Metric[]>,
  options$: Observable<MetricFilterOptions>,
): Observable<Metric[]> => {
  return combineLatest([list$, options$]).pipe(map(([list, options]) => list.filter(isMetricValid(options))));
};
