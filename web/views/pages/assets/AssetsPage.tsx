import React, { FC } from 'react';
import { useCommand, useQuery } from '../../../core/react-clean-use-case/useCases';
import { FilterAssetList } from '../../../../application/useCases/assets/FilterAssetList';
import { AssetListFilterOptionsQuery } from '../../../../application/useCases/assets/AssetListFilterOptionsQuery';
import { MetricListFilterOptionsQuery } from '../../../../application/useCases/metrics/MetricListFilterOptionsQuery';
import { FilterMetricList } from '../../../../application/useCases/metrics/FilterMetricList';
import { AssetList } from './AssetList';
import { MetricList } from './MetricList';
import { map } from 'rxjs';

export const AssetsPage: FC = () => {
  const filterAssetList = useCommand(FilterAssetList);
  const selectedMetric$ = useQuery(AssetListFilterOptionsQuery, (q) => q.create().pipe(map(({ metric }) => metric)));
  const filterMetricList = useCommand(FilterMetricList);
  const selectedAsset$ = useQuery(MetricListFilterOptionsQuery, (q) => q.create().pipe(map(({ ticker }) => ticker)));

  return (
    <div className="columns h-100 no-margin">
      <div className="column h-100">
        <AssetList onSelect={(ticker) => filterMetricList.execute({ ticker })} selected$={selectedAsset$} />
      </div>
      <div className="column h-100">
        <MetricList onSelect={(metric) => filterAssetList.execute({ metric })} selected$={selectedMetric$} />
      </div>
    </div>
  );
};
