import { ILogger } from '../application/domain/ILogger';
import { IDisposable } from '../core/IDisposable';

export class ConsoleLogger implements ILogger, IDisposable {
  constructor(private prefix: string) {}

  log(...args: unknown[]): void {
    console.log(this.prefix, ...args);
  }

  dispose(): void {
    console.log('logger:disposed');
  }
}
