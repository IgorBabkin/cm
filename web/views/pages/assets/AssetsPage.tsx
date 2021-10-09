import React, { FC, useContext, useMemo } from 'react';
import { AssetList } from './AssetList';
import { MetricList } from './MetricList';
import {
  AssetFilterOptionsContext,
  MetricFilterOptionsContext,
  updateAssetFilter,
  updateMetricFilter,
} from './context';
import { map } from 'rxjs';

export const AssetsPage: FC = () => {
  const assetListFilterOptions$ = useContext(AssetFilterOptionsContext);
  const metricListFilterOptions$ = useContext(MetricFilterOptionsContext);
  const selectedMetric$ = useMemo(() => assetListFilterOptions$.pipe(map((v) => v.metric)), [assetListFilterOptions$]);
  const selectedAsset$ = useMemo(() => metricListFilterOptions$.pipe(map((v) => v.ticker)), [metricListFilterOptions$]);

  return (
    <div className="columns h-100 m-0">
      <div className="column h-100">
        <AssetList
          onSelect={(ticker) => updateMetricFilter(metricListFilterOptions$, { ticker })}
          selected$={selectedAsset$}
        />
      </div>
      <div className="column h-100">
        <MetricList
          onSelect={(metric) => updateAssetFilter(assetListFilterOptions$, { metric })}
          selected$={selectedMetric$}
        />
      </div>
    </div>
  );
};
