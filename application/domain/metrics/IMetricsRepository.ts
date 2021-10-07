import { IMetric } from './IMetric';

export const IMetricsRepositoryKey = Symbol.for('IMetricsRepository');

export interface IMetricsRepository {
  fetchAll(): Promise<IMetric[]>;
}
