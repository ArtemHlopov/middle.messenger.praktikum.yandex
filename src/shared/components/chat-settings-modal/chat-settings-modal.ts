import { Block } from "../block";
import { ButtonComponent } from "../button/button";
import { InputComponent } from "../input/input";
import { default as modal } from "./chat-settings-modal.hbs?raw";
import "./chat-settings-modal.scss";
import * as ChatsService from "../../services/chats-service";
import { convertToNumber } from "../../utils/helpers";
import { Router } from "../../../router/router";
import { RoutesLinks } from "../../models/models";
import wsChat from "../../../store/socket";

interface ChatSettingsModalProps {
  title: string;
  description?: string;
}

const buttonsNames = {
  addUser: "modal-add-btn",
  deleteUser: "modal-remove-btn",
  removeChat: "modal-delete-btn",
};

export class ChatSettingsModalComponent extends Block {
  private inputValue = "";

  constructor(props: ChatSettingsModalProps) {
    const openBtn = new ButtonComponent("div", {
      text: "Settings",
      attr: { class: "button-wrapper" },
      additionalClass: "button-filled open-modal-btn",
      events: {
        click: () => {
          this.toggleModal();
        },
      },
    });

    const closeBtn = new ButtonComponent("div", {
      text: "x",
      attr: { class: "modal-close" },
      events: {
        click: () => {
          this.toggleModal();
        },
      },
    });

    const inputField = new InputComponent("div", {
      type: "text",
      attr: { class: "modal-input" },
      placeholder: "Enter user id",
      events: {
        input: (event: Event) => {
          const target = event?.target;
          if (target instanceof HTMLInputElement) {
            this.inputValue = target.value;
          }
        },
      },
    });

    const addBtn = new ButtonComponent("div", {
      text: "Add user",
      attr: { class: "modal-btn" },
      additionalClass: `button-filled ${buttonsNames.addUser}`,
      type: "submit",
    });
    const removeBtn = new ButtonComponent("div", {
      text: "Remove user",
      attr: { class: "modal-btn" },
      additionalClass: `button-filled ${buttonsNames.deleteUser}`,
      type: "submit",
    });

    const removeChatBtn = new ButtonComponent("div", {
      text: "Remove chat",
      attr: { class: "modal-btn" },
      additionalClass: `button-filled ${buttonsNames.removeChat}`,
      type: "submit",
    });

    super("div", {
      ...props,
      openBtn,
      closeBtn,
      inputField,
      addBtn,
      removeBtn,
      removeChatBtn,
      attr: { class: "modal-wrapper" },
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();
          event.stopPropagation();

          if (!this.inputValue) {
            inputField.setProps({ errorText: "Field is required" });
            return;
          }

          const submitter = event.submitter;

          if (
            submitter instanceof HTMLButtonElement &&
            submitter.classList.contains(buttonsNames.removeChat)
          ) {
            const id = Number(window.store.getState().pickedChat?.chatId);
            if (id && !isNaN(id)) {
              ChatsService.removeChat(id).then((data) => {
                if (data && data.result.id === id) {
                  this.toggleModal();
                  window.store.set({ pickedChat: null, tokenChat: "" });
                  Router.getInstance().go(RoutesLinks.chats);
                  wsChat.closeConnect();
                } else {
                  inputField.setProps({
                    errorText: "Error during removing chat",
                  });
                }
              });
            }
          }

          const number = convertToNumber(this.inputValue);
          const chatID = window.store.getState().pickedChat?.chatId;

          if (number && chatID && submitter instanceof HTMLButtonElement) {
            if (submitter.classList.contains(buttonsNames.deleteUser)) {
              ChatsService.removeUserFromChat({
                users: [number],
                chatId: Number(chatID),
              })
                .then((data) => {
                  if (data === "OK") {
                    inputField.setProps({
                      errorText: "",
                      value: "",
                    });
                    this.toggleModal();
                  } else {
                    inputField.setProps({
                      errorText: "Error during removing user",
                    });
                  }
                })
                .catch(() =>
                  inputField.setProps({
                    errorText: "Error during removing user",
                  })
                );
              return;
            }
            if (submitter.classList.contains(buttonsNames.addUser)) {
              ChatsService.addUserToChat({
                users: [number],
                chatId: Number(chatID),
              })
                .then((data) => {
                  if (data === "OK") {
                    inputField.setProps({
                      errorText: "",
                      value: "",
                    });
                    this.toggleModal();
                  } else {
                    inputField.setProps({
                      errorText: "Error during removing user",
                    });
                  }
                })
                .catch(() =>
                  inputField.setProps({
                    errorText: "Error during removing user",
                  })
                );
              return;
            }
          }
        },
      },
    });

    this.toggleModal();
  }

  private toggleModal(): void {
    const modal = document.querySelector(".modal-overlay");
    modal?.classList.toggle("visible");
  }

  deleteChat() {}

  render(): DocumentFragment {
    return this.compile(modal);
  }
}
