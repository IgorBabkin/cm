import React, { FC, useContext, useEffect, useMemo } from 'react';
import { Each, useObservables } from 'reactivex-react';
import cn from 'classnames';
import { MetricName } from '../domain/metrics/Metric';
import { Observable } from 'rxjs';
import { MetricFilterOptionsContext, MetricListContext } from './context';
import { filterMetrics, loadMetrics, resetMetricFilter, updateAssetFilter } from '../domain/useCases';
import { SearchInput } from '../ui/SearchInput';
import { Button } from '../ui/Button';

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
      <div className="panel-heading">
        <div className="level">
          <div className="level-left">
            <div className="level-item">Metrics</div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <span className="tag is-primary">
                {$(filteredList$)?.length} of {$(list$)?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <p className="control has-icons-left">
          <SearchInput
            value={$(options$)!.searchText}
            onChange={(searchText) => updateAssetFilter(options$, { searchText })}
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
        <Button fullwidth onClick={() => resetMetricFilter(options$)}>
          Reset filters
        </Button>
      </div>
    </div>
  );
};
