import { BlockProps, Children } from "../models/models";
import { EventBus } from "./event-bus";
import { v4 as uuidv4 } from "uuid";
import * as Handlebars from "handlebars";

export abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element: HTMLElement;

  tagName: string;
  props: BlockProps;

  _id: string | null = null;
  _props: BlockProps;
  _children: Children;
  _eventBus: () => EventBus;
  _setUpdate = false;

  constructor(tagName = "div", propsAndChilds: BlockProps = {}) {
    const { childs, props } = this.getPropsAndChilds(propsAndChilds);

    const eventBus = new EventBus();
    this._eventBus = () => eventBus;
    this.tagName = tagName;
    this._children = this._makePropsProxy(childs) as Children;
    this._id = uuidv4();
    this._props = props;
    this._element = this._createDocumentElement(this.tagName);
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => component.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }
    const oldprops = { ...this.props };
    this._setUpdate = false;

    const { props, childs } = this.getPropsAndChilds(nextProps);
    Object.assign(this._children, childs);
    Object.assign(this.props, props);

    if (this._setUpdate) {
      this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldprops, this.props);
      this._setUpdate = false;
    }
  };

  get element() {
    return this._element;
  }

  _render() {
    const component = this.render();

    this.removeEventsFromBlock();

    this._element.innerHTML = "";
    this._element.appendChild(component);

    this.addAttributesToBlock();
    this.addEventsToBlock();
  }

  render() {
    return document.createDocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: BlockProps | Children) {
    return new Proxy(props, {
      get: (target: BlockProps, prop) => {
        if (typeof prop === "string" && prop in target) {
          if (typeof target[prop] !== "function") {
            return target[prop];
          }
          return target[prop].bind(this);
        }
        return undefined;
      },
      set: (target: BlockProps, prop, value: unknown) => {
        if (typeof prop === "string") {
          if (target[prop] !== value) {
            target[prop] = value;
            this._setUpdate = true;
          }
        }

        return true;
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  private getPropsAndChilds(propsAndChilds: BlockProps): {
    childs: Children;
    props: BlockProps;
  } {
    const childs: Children = {};
    const props: BlockProps = {};

    Object.entries(propsAndChilds).forEach(([key, value]) => {
      if (value instanceof Block) {
        childs[key] = value;
      } else if (
        Array.isArray(value) &&
        value.every((prop) => prop instanceof Block)
      ) {
        childs[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { childs, props };
  }

  private addEventsToBlock(): void {
    const events = this.props.events;
    if (events) {
      Object.keys(events).forEach((key) => {
        if (typeof events[key] === "function") {
          this._element?.addEventListener(key, events[key]);
        }
      });
    }
  }

  private removeEventsFromBlock(): void {
    const events = this.props.events;
    if (events) {
      Object.keys(events).forEach((key) => {
        this._element?.removeEventListener(key, events[key]);
      });
    }
  }

  private addAttributesToBlock(): void {
    const attributes = this.props.attr;
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        this._element?.setAttribute(key, attributes[key]);
      });
    }
  }

  compile(template: string) {
    const propsAndStubs = { ...this.props };

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((component) => `<div data-id="${component._id}"></div>`)
          .join("");
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = document.createElement("template");
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(
            `[data-id="${component._id}"]`
          );

          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }
}
