import React, { FC, useEffect } from 'react';
import { useCommand, useQuery } from '../../../core/react-clean-use-case/useCases';
import { AssetListQuery } from '../../../../application/useCases/assets/AssetListQuery';
import { Each, useObservables } from 'reactivex-react';
import { FilterAssetList } from '../../../../application/useCases/assets/FilterAssetList';
import { AssetListFilterOptionsQuery } from '../../../../application/useCases/assets/AssetListFilterOptionsQuery';
import cn from 'classnames';
import { ResetAssetFilters } from '../../../../application/useCases/assets/ResetAssetFilters';
import { Ticker } from '../../../../application/domain/assets/IAsset';
import { LoadAssetLists } from '../../../../application/useCases/assets/LoadAssetLists';
import { Observable } from 'rxjs';

interface AssetListProps {
  onSelect: (ticker: Ticker) => void;
  selected$: Observable<Ticker>;
}

export const AssetList: FC<AssetListProps> = ({ onSelect, selected$ }) => {
  const $ = useObservables();

  const loadList = useCommand(LoadAssetLists);
  const resetAssetFilters = useCommand(ResetAssetFilters);
  const assetList$ = useQuery(AssetListQuery, (q) => q.create());
  const filterAssetList = useCommand(FilterAssetList);
  const assetListFilterOptions$ = useQuery(AssetListFilterOptionsQuery, (q) => q.create());

  useEffect(() => loadList.execute(), []);

  return (
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
        <button className="button is-link is-outlined is-fullwidth" onClick={() => resetAssetFilters.execute()}>
          Reset all filters
        </button>
      </div>
    </div>
  );
};
