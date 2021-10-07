import { IDataMapper } from '../../core/IDataMapper';
import { MethodNotImplementedError } from '../../core/errors/MethodNotImplementedError';
import { MetricPersistence } from '../dataSource/persistence';
import { Metric } from '../../application/domain/metrics/Metric';
import { IMetric } from '../../application/domain/metrics/IMetric';
import { distinct } from '../../core/utils';

export class MetricDataMapper implements IDataMapper<IMetric, MetricPersistence> {
  toDomain(value: MetricPersistence): IMetric {
    return new Metric({
      name: value.metric,
      title: value.full_name,
      assets: distinct(value.frequencies.flatMap((i) => i.assets)),
    });
  }

  toPersistence(value: IMetric): MetricPersistence {
    throw new MethodNotImplementedError('toPersistence');
  }
}
