import React, { FC, useContext, useEffect, useMemo } from 'react';
import { Each, useObservables } from 'reactivex-react';
import cn from 'classnames';
import { Ticker } from '../../../domain/assets/Asset';
import { Observable } from 'rxjs';
import { AssetFilterOptionsContext, AssetListContext } from './context';
import { filterAssets, loadAssets, resetAssetFilter, updateMetricFilter } from '../../../domain/useCases';

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
      <div className="panel-heading">Assets</div>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search"
            value={$(options$)!.searchText}
            onChange={({ target }) => updateMetricFilter(options$, { searchText: target.value })}
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
        <button className="button is-fullwidth" onClick={() => resetAssetFilter(options$)}>
          Reset all filters
        </button>
      </div>
    </div>
  );
};
