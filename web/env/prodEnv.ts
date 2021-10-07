import { IServiceLocator, ProviderBuilder } from 'ts-ioc-container';
import { ConsoleLogger } from '../../infrastructure/ConsoleLogger';
import { ILoggerKey } from '../../application/domain/ILogger';

export function prodEnv(l: IServiceLocator): IServiceLocator {
  return l.register(ILoggerKey, ProviderBuilder.fromConstructor(ConsoleLogger).asSingleton().forLevel(1).build());
}
