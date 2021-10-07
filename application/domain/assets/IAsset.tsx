interface IMetric {
  name: 'AdrActCnt';
  frequencies: [];
}

export interface IAsset {
  ticker: string;
  title: string;
  metrics: IMetric[];
}
