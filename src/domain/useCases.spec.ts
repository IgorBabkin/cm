import { filterAssets, updateAssetFilter } from './useCases';
import { BehaviorSubject } from 'rxjs';
import { AssetFilterOptions } from './assets/AssetFilterOptions';
import { Asset } from './assets/Asset';

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
});
