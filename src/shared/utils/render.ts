import { Block } from "../components/block";

export function render(selector: string, block: Block): Element | null {
  const root = document.querySelector(selector);
  const content = block.getContent();

  if (content && root) {
    root.innerHTML = "";
    root.appendChild(content);
  }

  block.dispatchComponentDidMount();

  return root;
}
