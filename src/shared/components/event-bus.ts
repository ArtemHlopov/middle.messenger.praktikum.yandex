import { CallBack } from "../models/models";

export class EventBus {
  listeners: Record<string, CallBack[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: CallBack): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: CallBack): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event].forEach((listener) => listener(...args));
  }
}
