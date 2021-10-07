import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { IAssetList, IAssetListKey } from '../../domain/assets/IAssetList';
import { IMetricList, IMetricListKey } from '../../domain/assets/IMetricList';

export class ResetFilters implements ICommand {
  constructor(
    @inject(IAssetListKey) private assetList: IAssetList,
    @inject(IMetricListKey) private metricList: IMetricList,
  ) {}

  execute(): void {
    this.assetList.resetFilter();
    this.metricList.resetFilter();
  }
}
