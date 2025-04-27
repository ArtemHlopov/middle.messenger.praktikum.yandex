export class EventBus<E extends string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  listeners: { [key in E]?: Function[] } = {};

  on<F extends (...args: Parameters<F>) => void>(event: E, callback: F): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off<F extends (...args: any) => void>(event: E, callback: F): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit<F extends (...args: any) => void>(
    event: E,
    ...args: Parameters<F>
  ): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event]!.forEach(function (listener) {
      listener(...args);
    });
  }
}
