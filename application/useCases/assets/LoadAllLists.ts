import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { IAssetsRepository, IAssetsRepositoryKey } from '../../domain/assets/IAssetsRepository';
import { IAssetList, IAssetListKey } from '../../domain/assets/IAssetList';
import { IMetricsRepository, IMetricsRepositoryKey } from '../../domain/metrics/IMetricsRepository';
import { IMetricList, IMetricListKey } from '../../domain/metrics/IMetricList';

export class LoadAllLists implements ICommand {
  constructor(
    @inject(IAssetsRepositoryKey) private assetsRepository: IAssetsRepository,
    @inject(IMetricsRepositoryKey) private metricsRepository: IMetricsRepository,
    @inject(IAssetListKey) private assetList: IAssetList,
    @inject(IMetricListKey) private metricList: IMetricList,
  ) {}

  execute(): void {
    (async () => {
      const [assets, metrics] = await Promise.all([
        this.assetsRepository.fetchAll(),
        this.metricsRepository.fetchAll(),
      ]);
      this.assetList.setItems(assets);
      this.metricList.setItems(metrics);
    })();
  }
}
