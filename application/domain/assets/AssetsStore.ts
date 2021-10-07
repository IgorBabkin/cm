import { Observable } from 'rxjs';
import { IAsset } from './IAsset';
import { IAssetsStore } from './IAssetsStore';
import { ObservableStore } from 'reactivex-store';

export class AssetsStore implements IAssetsStore {
  private assets$ = new ObservableStore<IAsset[]>([]);

  getAssets$(): Observable<IAsset[]> {
    return this.assets$.toObservable();
  }

  setAssets(assets: IAsset[]): void {
    this.assets$.map(() => assets);
  }
}
