export interface ISocketClient {
  connect: (url: string) => void;
  disconnect: () => void;
  onMessage: (callback: (message: string) => void) => void;
  sendMessage: (message: string) => void;
  addEventListener<D>(event: string, callback: (data: D) => void): void;
  removeEventListener<D>(event: string, callback: (data: D) => void): void;
  removeAllEventListeners: () => void;
  isConnected: () => boolean;
}
