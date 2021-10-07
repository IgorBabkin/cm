import React, { FC, useEffect } from 'react';
import { useCommand, useQuery } from '../../../core/react-clean-use-case/useCases';
import { LoadAllLists } from '../../../../application/useCases/assets/LoadAllLists';
import { AssetListQuery } from '../../../../application/useCases/assets/AssetListQuery';
import { Each, useObservables } from 'reactivex-react';
import { MetricListQuery } from '../../../../application/useCases/assets/MetricListQuery';
import { FilterAssetList } from '../../../../application/useCases/assets/FilterAssetList';
import { AssetListFilterOptionsQuery } from '../../../../application/useCases/assets/AssetListFilterOptionsQuery';
import cn from 'classnames';
import { ResetFilters } from '../../../../application/useCases/assets/ResetFilters';
import { MetricListFilterOptionsQuery } from '../../../../application/useCases/assets/MetricListFilterOptionsQuery';
import { FilterMetricList } from '../../../../application/useCases/assets/FilterMetricList';

export const AssetsPage: FC = () => {
  const $ = useObservables();

  const loadAllList = useCommand(LoadAllLists);
  const resetFilters = useCommand(ResetFilters);

  const assetList$ = useQuery(AssetListQuery, (q) => q.create());
  const filterAssetList = useCommand(FilterAssetList);
  const assetListFilterOptions$ = useQuery(AssetListFilterOptionsQuery, (q) => q.create());

  const metricList$ = useQuery(MetricListQuery, (q) => q.create());
  const filterMetricList = useCommand(FilterMetricList);
  const metricListFilterOptions$ = useQuery(MetricListFilterOptionsQuery, (q) => q.create());

  useEffect(() => loadAllList.execute(), []);

  return (
    <div>
      <button className="btn btn-danger" onClick={() => resetFilters.execute()}>
        Reset
      </button>
      <div className="row mt-3">
        <div className="col">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              value={$(assetListFilterOptions$)!.searchText}
              onChange={({ target }) => filterAssetList.execute({ searchText: target.value })}
            />
          </div>
          <ul className="list-group">
            <Each obs$={assetList$}>
              {({ ticker, title }) => (
                <li
                  key={ticker}
                  className={cn('list-group-item', { active: ticker === $(metricListFilterOptions$)?.ticker })}
                  onClick={() => filterMetricList.execute({ ticker })}
                >
                  {title}
                </li>
              )}
            </Each>
          </ul>
        </div>
        <div className="col">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              value={$(metricListFilterOptions$)!.searchText}
              onChange={({ target }) => filterMetricList.execute({ searchText: target.value })}
            />
          </div>
          <ul className="list-group">
            <Each obs$={metricList$}>
              {({ name, title }) => (
                <li
                  key={name}
                  className={cn('list-group-item', { active: name === $(assetListFilterOptions$)?.metric })}
                  onClick={() => filterAssetList.execute({ metric: name })}
                >
                  {title}
                </li>
              )}
            </Each>
          </ul>
        </div>
      </div>
    </div>
  );
};
