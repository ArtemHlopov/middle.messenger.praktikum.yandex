import { EventBus } from "../shared/components/event-bus.ts";
import { UserInfo } from "../shared/models/auth.models.ts";
import { ChatInfo } from "../shared/models/chat.models.ts";

export enum StoreEvents {
  Updated = "Updated",
}

interface Indexed {
  user?: UserInfo;
  chats?: ChatInfo[];
  // pickedChat?: getChatsResponse;
  // messages?: MessageResponse;
}

export class Store extends EventBus<string> {
  private _state: Indexed = {};
  private static _instance: Store;

  constructor(defaultState: {}) {
    if (Store._instance) {
      return Store._instance;
    }
    super();

    this._state = defaultState;
    this.set(defaultState);

    Store._instance = this;
  }

  public getState() {
    return this._state;
  }

  public set(nextState: {}) {
    const prevState = { ...this._state };

    this._state = { ...this._state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
