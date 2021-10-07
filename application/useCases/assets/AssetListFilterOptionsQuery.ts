import { IQuery } from 'clean-use-case';
import { Observable } from 'rxjs';
import { inject } from '../../decorators';
import { AssetListFilterOptions, IAssetList, IAssetListKey } from '../../domain/assets/IAssetList';

export class AssetListFilterOptionsQuery implements IQuery<AssetListFilterOptions> {
  constructor(@inject(IAssetListKey) private assetList: IAssetList) {}

  create(): Observable<AssetListFilterOptions> {
    return this.assetList.getFilterOptions$();
  }
}
