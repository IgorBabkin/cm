import { createContext } from 'react';
import { BehaviorSubject } from 'rxjs';
import { IAssetState } from '../../../domain/assets/IAsset';
import { IMetricState } from '../../../domain/metrics/IMetric';
import { MetricFilterOptions } from '../../../domain/metrics/MetricFilterOptions';
import { AssetFilterOptions } from '../../../domain/assets/AssetFilterOptions';

export const updateAssetFilter = (
  filter$: BehaviorSubject<AssetFilterOptions>,
  options: Partial<AssetFilterOptions>,
) => {
  filter$.next({ ...filter$.getValue(), ...options });
};

export const updateMetricFilter = (
  filter$: BehaviorSubject<MetricFilterOptions>,
  options: Partial<MetricFilterOptions>,
) => {
  filter$.next({ ...filter$.getValue(), ...options });
};

export const AssetListContext = createContext(new BehaviorSubject<IAssetState[]>([]));
export const AssetFilterOptionsContext = createContext(new BehaviorSubject<AssetFilterOptions>({ searchText: '' }));
export const MetricFilterOptionsContext = createContext(new BehaviorSubject<MetricFilterOptions>({ searchText: '' }));
export const MetricListContext = createContext(new BehaviorSubject<IMetricState[]>([]));
