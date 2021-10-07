import { IQuery } from 'clean-use-case';
import { IAsset } from '../../domain/assets/IAsset';
import { Observable } from 'rxjs';
import { inject } from '../../decorators';
import { IAssetList, IAssetListKey } from '../../domain/assets/IAssetList';

export class AssetListQuery implements IQuery<IAsset[]> {
  constructor(@inject(IAssetListKey) private assetList: IAssetList) {}

  create(): Observable<IAsset[]> {
    return this.assetList.getItems$();
  }
}
