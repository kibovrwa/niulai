export async function saveNodePng(node: HTMLElement, name: string) {
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: false,
    backgroundColor: "#1c4324",
    skipFonts: false,
  });
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = name;
  a.click();
}
