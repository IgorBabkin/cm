import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { IAssetsRepository, IAssetsRepositoryKey } from '../../domain/assets/IAssetsRepository';
import { IAssetList, IAssetListKey } from '../../domain/assets/IAssetList';

export class LoadAssetLists implements ICommand {
  constructor(
    @inject(IAssetsRepositoryKey) private assetsRepository: IAssetsRepository,
    @inject(IAssetListKey) private assetList: IAssetList,
  ) {}

  execute(): void {
    (async () => {
      const assets = await this.assetsRepository.fetchAll();
      this.assetList.setItems(assets);
    })();
  }
}
