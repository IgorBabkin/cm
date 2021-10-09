import React, { FC, useEffect, useMemo } from 'react';
import { Each, If, useObservables } from 'reactivex-react';
import cn from 'classnames';
import { Ticker } from '../../domain/assets/Asset';
import { mapTo, Observable, shareReplay, startWith } from 'rxjs';
import { useAssetFilterOptions, useAssetList } from '../context';
import { filterAssets, resetAssetFilter, updateMetricFilter } from '../../domain/useCases';
import { SearchInput } from '../../ui/SearchInput';
import { Button } from '../../ui/Button';
import { AssetItem } from './AssetItem';
import { fetchAssets } from '../../api/api';
import { not } from '../../utils/common';
import { ProgressBar } from '../../ui/ProgressBar';

interface AssetListProps {
  onSelect: (ticker: Ticker) => void;
  selected$: Observable<Ticker | undefined>;
}

export const AssetList: FC<AssetListProps> = ({ onSelect, selected$ }) => {
  const $ = useObservables();

  const options$ = useAssetFilterOptions();
  const list$ = useAssetList();
  const loadAssets$ = useMemo(() => fetchAssets().pipe(shareReplay(1)), []);
  const isLoaded$ = useMemo(() => loadAssets$.pipe(mapTo(true)), [loadAssets$]);
  const filteredList$ = useMemo(() => filterAssets(list$, options$), [list$, options$]);

  useEffect(() => {
    const subscription = loadAssets$.subscribe(list$);
    return () => subscription.unsubscribe();
  }, [loadAssets$, isLoaded$]);

  return (
    <div className="panel h-100 flex-panel">
      <div className="panel-heading">
        <div className="level">
          <div className="level-left">
            <div className="level-item">Assets</div>
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
            onChange={(searchText) => updateMetricFilter(options$, { searchText })}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block grow-1 no-overflow">
        <If predicate={not} obs$={isLoaded$}>
          <ProgressBar />
        </If>
        <If obs$={isLoaded$}>
          <ul className="block-list w-100 h-100 auto-scroll">
            <Each obs$={filteredList$}>
              {(item) => (
                <li
                  key={item.ticker}
                  className={cn({ 'is-highlighted': item.ticker === $(selected$) })}
                  onClick={() => onSelect(item.ticker)}
                >
                  <AssetItem {...item} />
                </li>
              )}
            </Each>
          </ul>
        </If>
      </div>
      <div className="panel-block">
        <Button fullwidth onClick={() => resetAssetFilter(options$)}>
          Reset filters
        </Button>
      </div>
    </div>
  );
};
