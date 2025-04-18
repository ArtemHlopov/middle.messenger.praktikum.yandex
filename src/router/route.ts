import { Block } from "../shared/components/block";
import { RouteInterface, RouteQuery } from "../shared/models/models";
import { render } from "../shared/utils/render";

export class Route implements RouteInterface {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: RouteQuery;

  constructor(pathname: string, view: typeof Block, props: RouteQuery) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block = null;
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (this._block) {
      this.leave();
    }
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    this._block.componentDidMount();
  }
}
