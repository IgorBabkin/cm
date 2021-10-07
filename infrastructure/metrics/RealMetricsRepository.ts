import { CommunityDataSource } from '../dataSource/CommunityDataSource';
import { MetricDataMapper } from './MetricDataMapper';
import { IMetricsRepository } from '../../application/domain/metrics/IMetricsRepository';
import { IMetric } from '../../application/domain/metrics/IMetric';

export class RealMetricsRepository implements IMetricsRepository {
  private dataSource = new CommunityDataSource();
  private mapper = new MetricDataMapper();

  async fetchAll(): Promise<IMetric[]> {
    const items = await this.dataSource.fetchMetricsCatalog();
    return items.map((i) => this.mapper.toDomain(i));
  }
}
