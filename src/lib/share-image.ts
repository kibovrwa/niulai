export async function saveNodePng(node: HTMLElement, name: string) {
  await inlineImages(node);
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: false,
    backgroundColor: "#1c4324",
    skipFonts: true,
    style: { outline: "none" },
  });
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = name;
  a.click();
}

async function inlineImages(root: HTMLElement) {
  const imgs = [...root.querySelectorAll("img")];
  await Promise.all(
    imgs.map(async (img) => {
      img.style.outline = "none";
      if (!img.src || img.src.startsWith("data:")) return;
      try {
        const res = await fetch(img.currentSrc || img.src);
        const blob = await res.blob();
        img.src = await blobToData(blob);
      } catch {
        /* keep original src */
      }
    }),
  );
}

function blobToData(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}
