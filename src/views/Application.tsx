import React, { FC, useMemo } from 'react';
import { AssetList } from './assets/AssetList';
import { MetricList } from './metrics/MetricList';
import { useAssetFilterOptions, useMetricFilterOptions } from './context';
import { map } from 'rxjs';
import { resetAllFilters, updateAssetFilter, updateMetricFilter } from '../domain/useCases';
import { Button } from '../ui/Button';

export const Application: FC = () => {
  const assetFilterOptions$ = useAssetFilterOptions();
  const metricFilterOptions$ = useMetricFilterOptions();
  const selectedMetric$ = useMemo(() => assetFilterOptions$.pipe(map((v) => v.metric)), [assetFilterOptions$]);
  const selectedAsset$ = useMemo(() => metricFilterOptions$.pipe(map((v) => v.ticker)), [metricFilterOptions$]);

  return (
    <div className="h-100 flex-panel">
      <div className="block is-flex is-justify-content-center mt-5">
        <Button danger onClick={() => resetAllFilters(assetFilterOptions$, metricFilterOptions$)}>
          Reset all filters
        </Button>
      </div>
      <div className="columns grow-1 no-overflow m-0">
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
    </div>
  );
};
