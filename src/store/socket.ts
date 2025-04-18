import { EventBus } from "../shared/components/event-bus";
import { API } from "../shared/models/api";
import { ChatMessageObj } from "../shared/models/chat.models";

export enum WSEvents {
  open = "open",
  close = "close",
  message = "message",
  error = "error",
}

export class ChatWebSocket extends EventBus<string> {
  private static _instance: ChatWebSocket;

  token!: number | string | null;
  userId!: number | string | null;
  chatId!: number | string | null;
  socket!: WebSocket | null;
  pingInterval!: number | null;
  messages: ChatMessageObj[] = [];

  openWS!: (event?: unknown) => void;
  closeWS!: (event: CloseEventInit) => void;
  messageWS!: (event: MessageEvent<unknown>) => void;
  errorWS!: (event: ErrorEventInit) => void;

  constructor() {
    if (ChatWebSocket._instance) {
      return ChatWebSocket._instance;
    }
    super();

    this.token = null;
    this.chatId = null;
    this.userId = null;
    this.socket = null;
    this.pingInterval = null;

    this.openWS = this.openWebSocket.bind(this);
    this.closeWS = this.closeWebSocket.bind(this);
    this.messageWS = this.messageWebSocket.bind(this);
    this.errorWS = this.wsError.bind(this);
  }

  createWebSocket() {
    const token = window.store.getState().tokenChat;
    const userId = window.store.getState().user?.id;
    const chatId = window.store.getState().pickedChat?.chatId;

    this.closeConnect();

    if (token && userId && chatId) {
      if (
        this.token === token &&
        userId === this.userId &&
        this.chatId === chatId
      ) {
        return;
      }

      this.token = token;
      this.chatId = chatId;
      this.userId = userId;

      this.socket = new WebSocket(`
              ${API.connectToWebSocket}${this.userId}/${this.chatId}/${this.token}
            `);

      if (this.socket) {
        this.setEventListeners();
        this.setPingInterval();
      }
    }
  }

  public closeConnect() {
    if (this.socket) {
      this.removeEventListeners();
      this.socket.close();
      this.socket = null;
      this.messages = [];
    }
  }

  private removeEventListeners() {
    if (this.socket) {
      this.socket.removeEventListener(WSEvents.open, this.openWS);
      this.socket.removeEventListener(WSEvents.close, this.closeWS);
      this.socket.removeEventListener(WSEvents.message, this.messageWS);
      this.socket.removeEventListener(WSEvents.error, this.errorWS);
    }
  }

  setEventListeners() {
    this.socket?.addEventListener(WSEvents.open, this.openWS);
    this.socket?.addEventListener(WSEvents.close, this.closeWS);
    this.socket?.addEventListener(WSEvents.message, this.messageWS);
    this.socket?.addEventListener(WSEvents.error, this.errorWS);
  }

  openWebSocket() {
    console.log("Connected");
    this.getMessagesList({ offset: "0" });
  }

  closeWebSocket(event: CloseEventInit) {
    if (event.wasClean) {
      console.log("Canceled");
    } else {
      console.log("Connection down");
    }
    this.clearPingInterval();
  }

  messageWebSocket(event: MessageEvent) {
    if (event?.data) {
      const data: ChatMessageObj | ChatMessageObj[] = JSON.parse(event.data);
      if ((data as ChatMessageObj).type === "pong") return;
      if (Array.isArray(data) && data.length === 0) {
        this.messages = data;
        this.emit(WSEvents.message);
      }
      if (
        Array.isArray(data) &&
        data.every((item) => item.type === "message")
      ) {
        this.messages = [...this.messages, ...data];
        this.emit(WSEvents.message);
      } else if ((data as ChatMessageObj).type === "message") {
        this.messages = [...this.messages, data as ChatMessageObj];
        this.emit(WSEvents.message);
      }
    }
  }

  wsError(event: ErrorEventInit) {
    console.log("Error", event.message);
  }

  public sendNewMessage(message: string) {
    this.socket?.send(JSON.stringify({ content: message, type: "message" }));
  }

  public getMessagesList({ offset }: { offset: string }) {
    this.socket?.send(JSON.stringify({ content: offset, type: "get old" }));
  }

  private setPingInterval() {
    this.clearPingInterval();
    this.pingInterval = setInterval(() => {
      this.socket?.send(JSON.stringify({ type: "ping", content: "" }));
    }, 3000);
  }

  private clearPingInterval() {
    if (this.pingInterval !== null) {
      clearInterval(this.pingInterval as number);
      this.pingInterval = null;
    }
  }
}

export default new ChatWebSocket();
