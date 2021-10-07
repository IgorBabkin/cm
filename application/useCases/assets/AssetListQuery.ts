import { IQuery } from 'clean-use-case';
import { IAsset } from '../../domain/assets/IAsset';
import { Observable } from 'rxjs';
import { inject } from '../../decorators';
import { IAssetsStore, IAssetsStoreKey } from '../../domain/assets/IAssetsStore';

export class AssetListQuery implements IQuery<IAsset[]> {
  constructor(@inject(IAssetsStoreKey) private assetsStore: IAssetsStore) {}

  create(): Observable<IAsset[]> {
    return this.assetsStore.getAssets$();
  }
}
