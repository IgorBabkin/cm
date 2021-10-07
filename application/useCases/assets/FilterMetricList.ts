import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { IMetricList, IMetricListKey, MetricListFilterOptions } from '../../domain/assets/IMetricList';

export class FilterMetricList implements ICommand {
  constructor(@inject(IMetricListKey) private metricList: IMetricList) {}

  execute(options: Partial<MetricListFilterOptions>): void {
    this.metricList.updateFilter(options);
  }
}
