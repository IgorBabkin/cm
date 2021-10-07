import { IQuery } from 'clean-use-case';
import { IMetricList, IMetricListKey, MetricListFilterOptions } from '../../domain/assets/IMetricList';
import { inject } from '../../decorators';
import { Observable } from 'rxjs';

export class MetricListFilterOptionsQuery implements IQuery<MetricListFilterOptions> {
  constructor(@inject(IMetricListKey) private metricList: IMetricList) {}

  create(): Observable<MetricListFilterOptions> {
    return this.metricList.getFilterOptions$();
  }
}
