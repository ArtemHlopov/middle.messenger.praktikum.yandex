import { BlockProps } from "../models/models";
import { Block } from "./block";

describe("Block", () => {
  class TestComponent extends Block {
    constructor(tag: string = "div", props: BlockProps = {}) {
      super(tag, { ...props });
    }

    render() {
      const template = `<${this.tagName} class="test-component">{{ text }}</${this.tagName}>`;
      return this.compile(template);
    }
  }

  it("must create element given tag", () => {
    const block = new Block("section");
    expect(block.element.tagName).toBe("SECTION");
  });

  it("must init and render content", () => {
    const block = new TestComponent("div", { text: "Hello" });
    const html = block.getContent().innerHTML;
    expect(html).toContain("Hello");
  });

  it("must show component", () => {
    const block = new Block("div");
    block.show();
    expect(block.getContent().style.display).toBe("block");
  });

  it("must hide component", () => {
    const block = new Block("div");
    block.hide();
    expect(block.getContent().style.display).toBe("none");
  });

  it("must set attributes", () => {
    const block = new Block("div", {
      attr: { id: "test-id", "data-test": "data-test-id" },
    });
    const el = block.getContent();
    expect(el.getAttribute("id")).toBe("test-id");
    expect(el.getAttribute("data-test")).toBe("data-test-id");
  });

  it("must set events", () => {
    const onClick = jest.fn();
    const block = new Block("div", {
      events: {
        click: onClick,
      },
    });

    const el = block.getContent();
    el.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("must render child", () => {
    const child = new TestComponent("span", { text: "child" });
    const parent = new TestComponent("div", {
      content: child,
    });

    const compiled = parent.compile("<div>{{{content}}}</div>");
    expect(compiled.querySelector("div")?.innerHTML).toContain("child");
  });

  it("must set props to child", () => {
    const child = new TestComponent();
    const parent = new Block("div");
    parent.setPropsForChildren(child, { text: "child text" });

    expect(child.props.text).toBe("child text");
  });

  it("must render children", () => {
    const children = [
      new TestComponent("div", { text: "child1" }),
      new TestComponent("div", { text: "child2" }),
    ];
    const parent = new TestComponent("div", {
      content: children,
    });

    const compiled = parent.compile("<div>{{{content}}}</div>");
    expect(compiled.querySelector("div")?.innerHTML).toContain("child1");
    expect(compiled.querySelector("div")?.innerHTML).toContain("child2");
  });

  it("must correct works with children array", () => {
    const children = [
      new TestComponent("div", { text: "" }),
      new TestComponent("div", { text: "" }),
    ];
    const parent = new Block("div");
    parent.setPropsForChildren(children, { text: "Updated" });

    expect(children[0].props.text).toBe("Updated");
    expect(children[1].props.text).toBe("Updated");
  });
});
