export interface AssetPersistence {
  asset: string;
  full_name: string;
  metrics?: { metric: string }[];
}

export interface MetricPersistence {
  metric: string;
  full_name: string;
  frequencies: {
    assets: string[];
  }[];
}

export type CommunityResponse<T> = { data: T };
