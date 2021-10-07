import { IAsset } from './IAsset';
import { Observable } from 'rxjs';

export type AssetListFilterOptions = { searchText: string; metric?: string };
export const IAssetListKey = Symbol.for('IAssetList');

export interface IAssetList {
  setItems(items: IAsset[]): void;

  getItems$(): Observable<IAsset[]>;

  getFilterOptions$(): Observable<AssetListFilterOptions>;

  updateFilter(options: Partial<AssetListFilterOptions>): void;

  resetFilter(): void;
}
