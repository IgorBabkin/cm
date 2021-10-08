import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { IMetricsRepository, IMetricsRepositoryKey } from '../../domain/metrics/IMetricsRepository';
import { IMetricList, IMetricListKey } from '../../domain/metrics/IMetricList';

export class LoadMetricLists implements ICommand {
  constructor(
    @inject(IMetricsRepositoryKey) private metricsRepository: IMetricsRepository,
    @inject(IMetricListKey) private metricList: IMetricList,
  ) {}

  execute(): void {
    (async () => {
      const metrics = await this.metricsRepository.fetchAll();
      this.metricList.setItems(metrics);
    })();
  }
}
