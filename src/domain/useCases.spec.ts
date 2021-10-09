import { filterAssets, loadAssets, updateAssetFilter } from './useCases';
import { BehaviorSubject, of } from 'rxjs';
import { AssetFilterOptions } from './assets/AssetFilterOptions';
import { Asset } from './assets/Asset';
import * as api from '../api/api';
import Mock = jest.Mock;

jest.mock('../api/api');

describe('useCases', () => {
  it('should not change existing filter option on update', () => {
    const filters = new BehaviorSubject<AssetFilterOptions>({ searchText: 'hey' });

    updateAssetFilter(filters, { metric: 'abc' });

    expect(filters.getValue()).toEqual({ metric: 'abc', searchText: 'hey' });
  });

  it('should filter assets', (done) => {
    const assets = new BehaviorSubject<Asset[]>([
      { title: 'hey', ticker: 'abc', metrics: [] },
      { title: 'ope', ticker: 'cbd', metrics: [] },
    ]);
    const filters = new BehaviorSubject<AssetFilterOptions>({ searchText: 'hey' });

    filterAssets(assets, filters).subscribe((actual) => {
      expect(actual.length).toBe(1);
      done();
    });
  });

  it('should load assets', function () {
    const list$ = new BehaviorSubject<Asset[]>([]);
    (api.fetchAssets as Mock).mockImplementation(() => {
      return of([{}, {}]);
    });

    loadAssets(list$);

    expect(list$.getValue().length).toBe(2);
  });
});
