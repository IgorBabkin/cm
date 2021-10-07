import { IDataMapper } from '../../core/IDataMapper';
import { IAsset } from '../../application/domain/assets/IAsset';
import { MethodNotImplementedError } from '../../core/errors/MethodNotImplementedError';
import { AssetPersistence } from '../dataSource/persistence';
import { Asset } from '../../application/domain/assets/Asset';

export class AssetDataMapper implements IDataMapper<IAsset, AssetPersistence> {
  toDomain(value: AssetPersistence): IAsset {
    return new Asset({
      ticker: value.asset,
      title: value.full_name,
      metrics: value.metrics?.map((i) => i.metric) ?? [],
    });
  }

  toPersistence(value: IAsset): AssetPersistence {
    throw new MethodNotImplementedError('toPersistence');
  }
}
