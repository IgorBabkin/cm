import { createContext, useContext } from 'react';
import { createAssetFilter, createAssets, createMetricFilter, createMetrics } from '../domain/useCases';

const AssetListContext = createContext(createAssets());
const AssetFilterOptionsContext = createContext(createAssetFilter());
const MetricFilterOptionsContext = createContext(createMetricFilter());
const MetricListContext = createContext(createMetrics());

export const useAssetList = () => {
  return useContext(AssetListContext);
};

export const useMetricList = () => {
  return useContext(MetricListContext);
};

export const useAssetFilterOptions = () => {
  return useContext(AssetFilterOptionsContext);
};

export const useMetricFilterOptions = () => {
  return useContext(MetricFilterOptionsContext);
};
