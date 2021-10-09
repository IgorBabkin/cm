import React, { FC, useContext, useEffect, useMemo } from 'react';
import { Each, useObservables } from 'reactivex-react';
import cn from 'classnames';
import { MetricName } from '../../../domain/metrics/Metric';
import { Observable } from 'rxjs';
import { MetricFilterOptionsContext, MetricListContext } from './context';
import { fetchMetrics } from '../../../api/api';
import { filterMetrics, loadMetrics, resetMetricFilter, updateAssetFilter } from '../../../domain/useCases';

interface AssetListProps {
  onSelect: (name: MetricName) => void;
  selected$: Observable<MetricName | undefined>;
}

export const MetricList: FC<AssetListProps> = ({ onSelect, selected$ }) => {
  const $ = useObservables();

  const options$ = useContext(MetricFilterOptionsContext);
  const list$ = useContext(MetricListContext);
  const filteredList$ = useMemo(() => filterMetrics(list$, options$), [list$, options$]);

  useEffect(() => {
    const subscription = loadMetrics(list$);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="panel h-100 flex-panel">
      <div className="panel-heading">Metrics</div>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search"
            value={$(options$)!.searchText}
            onChange={({ target }) => updateAssetFilter(options$, { searchText: target.value })}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block grow-1 no-overflow">
        <ul className="block-list w-100 h-100 auto-scroll">
          <Each obs$={filteredList$}>
            {({ name, title }) => (
              <li key={name} className={cn({ 'is-highlighted': name === $(selected$) })} onClick={() => onSelect(name)}>
                {title}
              </li>
            )}
          </Each>
        </ul>
      </div>
      <div className="panel-block">
        <button className="button is-fullwidth" onClick={() => resetMetricFilter(options$)}>
          Reset all filters
        </button>
      </div>
    </div>
  );
};
