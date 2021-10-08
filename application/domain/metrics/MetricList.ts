import { combineLatest, map, Observable } from 'rxjs';
import { ObservableStore } from 'reactivex-store';
import { IMetricList, MetricListFilterOptions } from './IMetricList';
import { IMetric } from './IMetric';
import { AssetListFilterOptions } from '../assets/IAssetList';

export class MetricList implements IMetricList {
  private items$ = new ObservableStore<IMetric[]>([]);
  private filterOptions$ = new ObservableStore<MetricListFilterOptions>({
    searchText: '',
  });

  getItems$(): Observable<IMetric[]> {
    return combineLatest([this.items$.toObservable(), this.filterOptions$.toObservable()]).pipe(
      map(([items, { searchText, ticker }]) => {
        return items.filter((i) => i.hasText(searchText) && (!ticker || i.hasAsset(ticker)));
      }),
    );
  }

  setItems(items: IMetric[]): void {
    this.items$.map(() => items);
  }

  getFilterOptions$(): Observable<MetricListFilterOptions> {
    return this.filterOptions$.toObservable();
  }

  updateFilter(options: Partial<AssetListFilterOptions>): void {
    console.log('Metrics', options);
    this.filterOptions$.map((current) => ({ ...current, ...options }));
  }

  resetFilter(): void {
    this.filterOptions$.map(() => ({
      searchText: '',
    }));
  }
}
