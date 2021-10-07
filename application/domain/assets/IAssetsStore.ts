import { IAsset } from './IAsset';
import { Observable } from 'rxjs';

export const IAssetsStoreKey = Symbol.for('IAssetsStore');
export interface IAssetsStore {
  setAssets(assets: IAsset[]): void;

  getAssets$(): Observable<IAsset[]>;
}
