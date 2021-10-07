import { IAsset } from './IAsset';

export const IAssetsRepositoryKey = Symbol.for('IAssetsRepository');
export interface IAssetsRepository {
  fetchAll(): Promise<IAsset[]>;
}
