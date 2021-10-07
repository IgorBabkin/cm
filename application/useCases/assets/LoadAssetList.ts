import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { IAssetsRepository, IAssetsRepositoryKey } from '../../domain/assets/IAssetsRepository';
import { IAssetsStore, IAssetsStoreKey } from '../../domain/assets/IAssetsStore';

export class LoadAssetList implements ICommand {
  constructor(
    @inject(IAssetsRepositoryKey) private assetsRepository: IAssetsRepository,
    @inject(IAssetsStoreKey) private assetsStore: IAssetsStore,
  ) {}

  execute(): void {
    (async () => {
      const assets = await this.assetsRepository.fetchAll();
      this.assetsStore.setAssets(assets);
    })();
  }
}
