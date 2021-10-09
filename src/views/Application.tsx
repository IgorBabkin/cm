import React, { FC, useMemo } from 'react';
import { AssetList } from './AssetList';
import { MetricList } from './MetricList';
import { useAssetFilterOptions, useMetricFilterOptions } from './context';
import { map } from 'rxjs';
import { updateAssetFilter, updateMetricFilter } from '../domain/useCases';

export const Application: FC = () => {
  const assetFilterOptions$ = useAssetFilterOptions();
  const metricFilterOptions$ = useMetricFilterOptions();
  const selectedMetric$ = useMemo(() => assetFilterOptions$.pipe(map((v) => v.metric)), [assetFilterOptions$]);
  const selectedAsset$ = useMemo(() => metricFilterOptions$.pipe(map((v) => v.ticker)), [metricFilterOptions$]);

  return (
    <div className="columns h-100 m-0">
      <div className="column h-100">
        <AssetList
          onSelect={(ticker) => updateMetricFilter(metricFilterOptions$, { ticker })}
          selected$={selectedAsset$}
        />
      </div>
      <div className="column h-100">
        <MetricList
          onSelect={(metric) => updateAssetFilter(assetFilterOptions$, { metric })}
          selected$={selectedMetric$}
        />
      </div>
    </div>
  );
};
