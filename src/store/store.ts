import { EventBus } from "../shared/components/event-bus.ts";
import { UserInfo } from "../shared/models/auth.models.ts";
import { ChatInfo } from "../shared/models/chat.models.ts";
import { Indexed } from "../shared/models/models.ts";

export enum StoreEvents {
  Updated = "Updated",
}

interface StoreObj extends Indexed {
  user?: UserInfo | null;
  chats?: ChatInfo[];
  isLoading?: false;
  pickedChat?: {
    chatId: string | number | null;
    chatTitle: string | null;
    chatAvatar: string | null;
  } | null;
  tokenChat?: string;
}

export class Store extends EventBus<string> {
  private _state: StoreObj = {};
  private static _instance: Store;

  constructor(defaultState: StoreObj) {
    if (Store._instance) {
      return Store._instance;
    }
    super();

    this._state = defaultState;
    this.set(defaultState);

    Store._instance = this;
  }

  public getState(): StoreObj {
    return this._state;
  }

  public set(nextState: StoreObj) {
    const prevState = { ...this._state };

    this._state = { ...this._state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
