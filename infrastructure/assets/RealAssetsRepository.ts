import { IAsset } from '../../application/domain/assets/IAsset';
import { IAssetsRepository } from '../../application/domain/assets/IAssetsRepository';
import { CommunityDataSource } from '../dataSource/CommunityDataSource';
import { AssetDataMapper } from './AssetDataMapper';

export class RealAssetsRepository implements IAssetsRepository {
  private dataSource = new CommunityDataSource();
  private mapper = new AssetDataMapper();

  async fetchAll(): Promise<IAsset[]> {
    const items = await this.dataSource.fetchAssetsCatalog();
    return items.map((i) => this.mapper.toDomain(i));
  }
}
