import { createContext } from 'react';
import { createAssetFilter, createAssets, createMetricFilter, createMetrics } from '../domain/useCases';

export const AssetListContext = createContext(createAssets());
export const AssetFilterOptionsContext = createContext(createAssetFilter());
export const MetricFilterOptionsContext = createContext(createMetricFilter());
export const MetricListContext = createContext(createMetrics());
