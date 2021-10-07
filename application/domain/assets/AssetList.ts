import { combineLatest, map, Observable } from 'rxjs';
import { IAsset } from './IAsset';
import { AssetListFilterOptions, IAssetList } from './IAssetList';
import { ObservableStore } from 'reactivex-store';

export class AssetList implements IAssetList {
  private items$ = new ObservableStore<IAsset[]>([]);
  private filterOptions$ = new ObservableStore<AssetListFilterOptions>({
    searchText: '',
  });

  getItems$(): Observable<IAsset[]> {
    return combineLatest([this.items$.toObservable(), this.filterOptions$.toObservable()]).pipe(
      map(([items, { searchText, metric }]) => {
        return items.filter((i) => i.hasText(searchText) && (!metric || i.hasMetric(metric)));
      }),
    );
  }

  setItems(items: IAsset[]): void {
    this.items$.map(() => items);
  }

  getFilterOptions$(): Observable<AssetListFilterOptions> {
    return this.filterOptions$.toObservable();
  }

  updateFilter(options: Partial<AssetListFilterOptions>): void {
    this.filterOptions$.map((current) => ({ ...current, ...options }));
  }

  resetFilter(): void {
    this.filterOptions$.map(() => ({
      searchText: '',
    }));
  }
}
