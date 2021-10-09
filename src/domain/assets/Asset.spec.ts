import { Asset, isAssetValid } from './Asset';
import { AssetFilterOptions } from './AssetFilterOptions';

describe('Asset', () => {
  it('should be valid if has metric', () => {
    const asset: Asset = { metrics: ['a', 'b', 'c'], ticker: 'eth', title: 'Etherium' };
    const filters: AssetFilterOptions = { searchText: '', metric: 'b' };

    const actual = isAssetValid(filters)(asset);

    expect(actual).toBe(true);
  });

  it('should be not valid if does not have metric', () => {
    const asset: Asset = { metrics: ['a', 'b', 'c'], ticker: 'eth', title: 'Etherium' };
    const filters: AssetFilterOptions = { searchText: '', metric: 'd' };

    const actual = isAssetValid(filters)(asset);

    expect(actual).toBe(false);
  });
});
