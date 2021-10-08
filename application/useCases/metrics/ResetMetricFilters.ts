import { ICommand } from 'clean-use-case';
import { inject } from '../../decorators';
import { IMetricList, IMetricListKey } from '../../domain/metrics/IMetricList';

export class ResetMetricFilters implements ICommand {
  constructor(@inject(IMetricListKey) private metricList: IMetricList) {}

  execute(): void {
    this.metricList.resetFilter();
  }
}
