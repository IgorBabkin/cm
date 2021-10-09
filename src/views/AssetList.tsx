import React, { FC, useContext, useEffect, useMemo } from 'react';
import { Each, useObservables } from 'reactivex-react';
import cn from 'classnames';
import { Ticker } from '../domain/assets/Asset';
import { Observable } from 'rxjs';
import { AssetFilterOptionsContext, AssetListContext } from './context';
import { filterAssets, loadAssets, resetAssetFilter, updateMetricFilter } from '../domain/useCases';
import { SearchInput } from '../ui/SearchInput';
import { Button } from '../ui/Button';

interface AssetListProps {
  onSelect: (ticker: Ticker) => void;
  selected$: Observable<Ticker | undefined>;
}

export const AssetList: FC<AssetListProps> = ({ onSelect, selected$ }) => {
  const $ = useObservables();

  const options$ = useContext(AssetFilterOptionsContext);
  const list$ = useContext(AssetListContext);
  const filteredList$ = useMemo(() => filterAssets(list$, options$), [list$, options$]);

  useEffect(() => {
    const subscription = loadAssets(list$);
    return () => subscription.unsubscribe();
  }, []);

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
        <ul className="block-list w-100 h-100 auto-scroll">
          <Each obs$={filteredList$}>
            {({ ticker, title }) => (
              <li
                key={ticker}
                className={cn({ 'is-highlighted': ticker === $(selected$) })}
                onClick={() => onSelect(ticker)}
              >
                {title}
              </li>
            )}
          </Each>
        </ul>
      </div>
      <div className="panel-block">
        <Button fullwidth onClick={() => resetAssetFilter(options$)}>
          Reset filters
        </Button>
      </div>
    </div>
  );
};
