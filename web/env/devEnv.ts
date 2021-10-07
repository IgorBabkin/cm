import { ILoggerKey } from '../../application';
import { IServiceLocator, ProviderBuilder } from 'ts-ioc-container';
import { ConsoleLogger } from '../../infrastructure/ConsoleLogger';
import { IAssetsRepositoryKey } from '../../application/domain/assets/IAssetsRepository';
import { StubAssetsRepository } from '../../infrastructure/StubAssetsRepository';
import { AssetList } from '../../application/domain/assets/AssetList';
import { assetTags } from './tags';
import { IMetricListKey } from '../../application/domain/metrics/IMetricList';
import { IMetricsRepositoryKey } from '../../application/domain/metrics/IMetricsRepository';
import { StubMetricsRepository } from '../../infrastructure/StubMetricsRepository';
import { MetricList } from '../../application/domain/metrics/MetricList';
import { IAssetListKey } from '../../application/domain/assets/IAssetList';

export function devEnv(l: IServiceLocator): IServiceLocator {
  return (
    l

      // Assets
      .register(IAssetListKey, ProviderBuilder.fromConstructor(AssetList).asSingleton().forTags(assetTags).build())
      .register(
        IAssetsRepositoryKey,
        ProviderBuilder.fromConstructor(StubAssetsRepository).asSingleton().forTags(assetTags).build(),
      )
      .register(IMetricListKey, ProviderBuilder.fromConstructor(MetricList).asSingleton().forTags(assetTags).build())
      .register(
        IMetricsRepositoryKey,
        ProviderBuilder.fromConstructor(StubMetricsRepository).asSingleton().forTags(assetTags).build(),
      )

      // Common
      .register(ILoggerKey, ProviderBuilder.fromConstructor(ConsoleLogger).asSingleton().forLevel(1).build())
  );
}
