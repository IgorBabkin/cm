export class MethodNotImplementedError extends Error {
  constructor(method: string) {
    super(`Method ${method} is not implemented`);

    Object.setPrototypeOf(this, MethodNotImplementedError.prototype);
  }
}
