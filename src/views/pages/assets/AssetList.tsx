import React, { FC, useContext, useEffect, useMemo } from 'react';
import { Each, useObservables } from 'reactivex-react';
import cn from 'classnames';
import { isAssetValid, Ticker } from '../../../domain/assets/IAsset';
import { combineLatest, map, Observable } from 'rxjs';
import { AssetFilterOptionsContext, AssetListContext, updateMetricFilter } from './context';
import { fetchAssets } from '../../../api/api';

interface AssetListProps {
  onSelect: (ticker: Ticker) => void;
  selected$: Observable<Ticker | undefined>;
}

export const AssetList: FC<AssetListProps> = ({ onSelect, selected$ }) => {
  const $ = useObservables();

  const options$ = useContext(AssetFilterOptionsContext);
  const list$ = useContext(AssetListContext);
  const filteredList$ = useMemo(
    () => combineLatest([list$, options$]).pipe(map(([list, options]) => list.filter(isAssetValid(options)))),
    [list$, options$],
  );

  useEffect(() => {
    const subscription = fetchAssets().subscribe(list$);
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
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => updateMetricFilter(options$, { searchText: '' })}
        >
          Reset all filters
        </button>
      </div>
    </div>
  );
};