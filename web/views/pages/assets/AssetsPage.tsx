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
import './assetsPage.scss';

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
    <div className="columns h-100">
      <div className="column h-100">
        <div className="panel h-100 flex-panel">
          <div className="panel-heading">Assets</div>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Search"
                value={$(assetListFilterOptions$)!.searchText}
                onChange={({ target }) => filterAssetList.execute({ searchText: target.value })}
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            </p>
          </div>
          <div className="panel-block grow-1 no-overflow">
            <ul className="block-list w-100 h-100 auto-scroll">
              <Each obs$={assetList$}>
                {({ ticker, title }) => (
                  <li
                    key={ticker}
                    className={cn({ 'is-highlighted': ticker === $(metricListFilterOptions$)?.ticker })}
                    onClick={() => filterMetricList.execute({ ticker })}
                  >
                    {title}
                  </li>
                )}
              </Each>
            </ul>
          </div>
        </div>
      </div>
      <div className="column h-100">
        <div className="panel h-100 flex-panel">
          <div className="panel-heading">Metrics</div>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Search"
                value={$(metricListFilterOptions$)!.searchText}
                onChange={({ target }) => filterMetricList.execute({ searchText: target.value })}
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            </p>
          </div>
          <div className="panel-block grow-1 no-overflow">
            <ul className="block-list w-100 h-100 auto-scroll">
              <Each obs$={metricList$}>
                {({ name, title }) => (
                  <li
                    key={name}
                    className={cn({ 'is-highlighted': name === $(assetListFilterOptions$)?.metric })}
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
    </div>
  );
};
