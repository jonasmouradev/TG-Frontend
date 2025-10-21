import { ISocketClient } from '@/core/domain';

export class SocketClientAdapter implements ISocketClient {
  private socket: WebSocket | null = null;
  private messageHandlers: Set<(message: string) => void> = new Set();
  private eventListeners: Map<string, Set<(data: unknown) => void>> = new Map();

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onmessage = event => {
      const message = event.data;
      this.messageHandlers.forEach(handler => handler(message));
    };

    this.socket.onopen = () => {
      console.log('Socket connected');
    };

    this.socket.onclose = () => {
      console.log('Socket disconnected');
    };

    this.socket.onerror = error => {
      console.error('Socket error:', error);
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageHandlers.clear();
    this.eventListeners.clear();
  }

  onMessage(callback: (message: string) => void): void {
    this.messageHandlers.add(callback);
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  addEventListener<D>(event: string, callback: (data: D) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(callback as (data: unknown) => void);
  }

  removeEventListener<D>(event: string, callback: (data: D) => void): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(callback as (data: unknown) => void);
      if (listeners.size === 0) {
        this.eventListeners.delete(event);
      }
    }
  }

  removeAllEventListeners(): void {
    this.eventListeners.clear();
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}
