import { Metric } from '../domain/metrics/Metric';
import { AssetPersistence, CommunityResponse, MetricPersistence } from './persistence';
import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Asset } from '../domain/assets/Asset';
import { distinct } from '../utils/common';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'https://community-api.coinmetrics.io' : 'https://api.coinmetrics.io';

function toMetricState(value: MetricPersistence): Metric {
  return {
    name: value.metric,
    title: value.full_name,
    assets: distinct(value.frequencies.flatMap((i) => i.assets)),
  };
}

export function fetchMetrics(): Observable<Metric[]> {
  return ajax
    .getJSON<CommunityResponse<MetricPersistence[]>>(`${BASE_URL}/v4/catalog/metrics`)
    .pipe(map(({ data }) => data.map((i) => toMetricState(i))));
}

function toAssetState(value: AssetPersistence): Asset {
  return {
    ticker: value.asset,
    title: value.full_name,
    metrics: value.metrics?.map((i) => i.metric) ?? [],
  };
}

export function fetchAssets(): Observable<Asset[]> {
  return ajax
    .getJSON<CommunityResponse<AssetPersistence[]>>(`${BASE_URL}/v4/catalog/assets`)
    .pipe(map(({ data }) => data.map((i) => toAssetState(i))));
}
