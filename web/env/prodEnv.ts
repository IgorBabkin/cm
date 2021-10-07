import { ILoggerKey } from '../../application';
import { IServiceLocator, ProviderBuilder } from 'ts-ioc-container';
import { ConsoleLogger } from '../../infrastructure/ConsoleLogger';

export function prodEnv(l: IServiceLocator): IServiceLocator {
  return l.register(ILoggerKey, ProviderBuilder.fromConstructor(ConsoleLogger).asSingleton().forLevel(1).build());
}
