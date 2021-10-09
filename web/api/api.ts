import { IMetricState } from '../domain/metrics/IMetric';
import { AssetPersistence, MetricPersistence } from './persistence';
import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { distinct } from '../utils/utils';
import { IAssetState } from '../domain/assets/IAsset';

const BASE_URL = 'https://community-api.coinmetrics.io';

function toMetricState(value: MetricPersistence): IMetricState {
  return {
    name: value.metric,
    title: value.full_name,
    assets: distinct(value.frequencies.flatMap((i) => i.assets)),
  };
}

export function fetchMetrics(): Observable<IMetricState[]> {
  return ajax
    .getJSON<MetricPersistence[]>(`${BASE_URL}/v4/catalog/metrics`)
    .pipe(map((items) => items.map((i) => toMetricState(i))));
}

function toAssetState(value: AssetPersistence): IAssetState {
  return {
    ticker: value.asset,
    title: value.full_name,
    metrics: value.metrics?.map((i) => i.metric) ?? [],
  };
}

export function fetchAssets(): Observable<IAssetState[]> {
  return ajax
    .getJSON<AssetPersistence[]>(`${BASE_URL}/v4/catalog/assets`)
    .pipe(map((items) => items.map((i) => toAssetState(i))));
}
