import {
  AddTodo,
  IAddTodoActionKey,
  ILoggerKey,
  ITodoRepositoryKey,
  ITodoStoreKey,
  TodoStore,
} from '../../application';
import { IServiceLocator, ProviderBuilder } from 'ts-ioc-container';
import { ConsoleLogger } from '../../infrastructure/ConsoleLogger';
import { StubTodoRepository } from '../../infrastructure/StubTodoRepository';
import { IAssetsRepositoryKey } from '../../application/domain/assets/IAssetsRepository';
import { StubAssetsRepository } from '../../infrastructure/StubAssetsRepository';
import { IAssetsStoreKey } from '../../application/domain/assets/IAssetsStore';
import { AssetsStore } from '../../application/domain/assets/AssetsStore';
import { assetTags } from './tags';

export function devEnv(l: IServiceLocator): IServiceLocator {
  return (
    l

      // Todos
      .register(IAddTodoActionKey, ProviderBuilder.fromConstructor(AddTodo).asSingleton().forLevel(0).build())
      .register(
        ITodoRepositoryKey,
        ProviderBuilder.fromConstructor(StubTodoRepository).asSingleton().forLevel(0).build(),
      )
      .register(ITodoStoreKey, ProviderBuilder.fromConstructor(TodoStore).asSingleton().forLevel(0).build())

      // Assets
      .register(IAssetsStoreKey, ProviderBuilder.fromConstructor(AssetsStore).asSingleton().forTags(assetTags).build())
      .register(
        IAssetsRepositoryKey,
        ProviderBuilder.fromConstructor(StubAssetsRepository).asSingleton().forTags(assetTags).build(),
      )

      // Common
      .register(ILoggerKey, ProviderBuilder.fromConstructor(ConsoleLogger).asSingleton().forLevel(1).build())
  );
}
