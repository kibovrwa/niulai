import { toPng } from "html-to-image";

export async function saveNodePng(node: HTMLElement, name: string) {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#1c4324",
  });
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = name;
  a.click();
}
