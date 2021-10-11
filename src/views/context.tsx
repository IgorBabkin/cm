import { createContext, useContext, useMemo } from 'react';
import { createAssetFilter, createMetricFilter } from '../domain/useCases';
import { fetchAssets, fetchMetrics } from '../api/api';
import { shareReplay } from 'rxjs';

const AssetFilterOptionsContext = createContext(createAssetFilter());
const MetricFilterOptionsContext = createContext(createMetricFilter());

export const useAssetList = () => {
  return useMemo(() => fetchAssets().pipe(shareReplay(1)), []);
};

export const useMetricList = () => {
  return useMemo(() => fetchMetrics().pipe(shareReplay(1)), []);
};

export const useAssetFilterOptions = () => {
  return useContext(AssetFilterOptionsContext);
};

export const useMetricFilterOptions = () => {
  return useContext(MetricFilterOptionsContext);
};
