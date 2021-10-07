import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { AssetListFilterOptions, IAssetList, IAssetListKey } from '../../domain/assets/IAssetList';

export class FilterAssetList implements ICommand {
  constructor(@inject(IAssetListKey) private assetList: IAssetList) {}

  execute(options: Partial<AssetListFilterOptions>): void {
    this.assetList.updateFilter(options);
  }
}
