import { AssetPersistence, MetricPersistence } from './persistence';

export class CommunityDataSource {
  private baseUrl = 'https://community-api.coinmetrics.io/v4';

  async fetchAssetsCatalog(): Promise<AssetPersistence[]> {
    const response = await fetch(`${this.baseUrl}/catalog/assets`);
    const { data } = await response.json();
    return data;
  }

  async fetchMetricsCatalog(): Promise<MetricPersistence[]> {
    const response = await fetch(`${this.baseUrl}/catalog/metrics`);
    const { data } = await response.json();
    return data;
  }
}
