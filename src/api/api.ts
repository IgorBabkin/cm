import { IMetricState } from '../domain/metrics/IMetric';
import { AssetPersistence, CommunityResponse, MetricPersistence } from './persistence';
import { catchError, map, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { IAssetState } from '../domain/assets/IAsset';
import { distinct } from '../utils/common';

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
    .getJSON<CommunityResponse<MetricPersistence[]>>(`${BASE_URL}/v4/catalog/metrics`)
    .pipe(map(({ data }) => data.map((i) => toMetricState(i))));
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
    .getJSON<CommunityResponse<AssetPersistence[]>>(`${BASE_URL}/v4/catalog/assets`)
    .pipe(map(({ data }) => data.map((i) => toAssetState(i))));
}
