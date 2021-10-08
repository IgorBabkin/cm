import React, { FC, useEffect } from 'react';
import { useCommand, useQuery } from '../../../core/react-clean-use-case/useCases';
import { Each, useObservables } from 'reactivex-react';
import cn from 'classnames';
import { MetricName } from '../../../../application/domain/metrics/IMetric';
import { ResetMetricFilters } from '../../../../application/useCases/metrics/ResetMetricFilters';
import { MetricListQuery } from '../../../../application/useCases/metrics/MetricListQuery';
import { FilterMetricList } from '../../../../application/useCases/metrics/FilterMetricList';
import { MetricListFilterOptionsQuery } from '../../../../application/useCases/metrics/MetricListFilterOptionsQuery';
import { LoadMetricLists } from '../../../../application/useCases/metrics/LoadMetricLists';
import { Observable } from 'rxjs';

interface AssetListProps {
  onSelect: (name: MetricName) => void;
  selected$: Observable<MetricName>;
}

export const MetricList: FC<AssetListProps> = ({ onSelect, selected$ }) => {
  const $ = useObservables();

  const loadList = useCommand(LoadMetricLists);
  const resetMetricFilters = useCommand(ResetMetricFilters);
  const metricList$ = useQuery(MetricListQuery, (q) => q.create());
  const filterMetricList = useCommand(FilterMetricList);
  const metricListFilterOptions$ = useQuery(MetricListFilterOptionsQuery, (q) => q.create());

  useEffect(() => loadList.execute(), []);

  return (
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
              <li key={name} className={cn({ 'is-highlighted': name === $(selected$) })} onClick={() => onSelect(name)}>
                {title}
              </li>
            )}
          </Each>
        </ul>
      </div>
      <div className="panel-block">
        <button className="button is-link is-outlined is-fullwidth" onClick={() => resetMetricFilters.execute()}>
          Reset all filters
        </button>
      </div>
    </div>
  );
};
