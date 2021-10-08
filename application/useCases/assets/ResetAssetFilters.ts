import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { IAssetList, IAssetListKey } from '../../domain/assets/IAssetList';

export class ResetAssetFilters implements ICommand {
  constructor(@inject(IAssetListKey) private assetList: IAssetList) {}

  execute(): void {
    this.assetList.resetFilter();
  }
}
