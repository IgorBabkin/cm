import { IQuery } from 'clean-use-case';
import { IMetric } from '../../domain/assets/IMetric';
import { inject } from '../../decorators';
import { IMetricList, IMetricListKey } from '../../domain/assets/IMetricList';
import { Observable } from 'rxjs';

export class MetricListQuery implements IQuery<IMetric[]> {
  constructor(@inject(IMetricListKey) private metricList: IMetricList) {}

  create(): Observable<IMetric[]> {
    return this.metricList.getItems$();
  }
}
