import QRCode from "qrcode";
import { publicUrl } from "@/lib/share";
import { luckyMark, wishById } from "@/lib/wish-data";
import type { WishRow } from "@/lib/wish-fns";

const INK = "#1a1610";
const PAPER = "#f3e6c8";
const CINN = "#c43a22";
const GOLD = "#f0d78a";
const MUTED = "#6b5a42";

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`image failed: ${src}`));
    img.src = src;
  });
}

async function waitFonts() {
  if (typeof document === "undefined" || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load('88px "Noto Serif SC"'),
      document.fonts.load('48px "Ma Shan Zheng"'),
      document.fonts.load('28px "Noto Sans SC"'),
    ]);
  } catch {
    /* system CJK still works on canvas */
  }
}

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const s = Math.max(w / img.width, h / img.height);
  const dw = img.width * s;
  const dh = img.height * s;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

export async function renderWishPoster(wish: WishRow, sameCount: number): Promise<Blob> {
  await waitFonts();
  const width = 1080;
  const height = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");

  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, width, height);

  try {
    const grass = await loadImage("/art/grass.jpg");
    coverDraw(ctx, grass, 0, 0, width, height);
  } catch {
    ctx.fillStyle = "#1c4324";
    ctx.fillRect(0, 0, width, height);
  }

  const night = ctx.createLinearGradient(0, 0, 0, height);
  night.addColorStop(0, "rgba(26,22,16,0.35)");
  night.addColorStop(0.45, "rgba(26,22,16,0.15)");
  night.addColorStop(1, "rgba(26,22,16,0.88)");
  ctx.fillStyle = night;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  const halo = ctx.createRadialGradient(width / 2, 620, 40, width / 2, 620, 420);
  halo.addColorStop(0, "rgba(255,211,106,0.55)");
  halo.addColorStop(1, "rgba(255,211,106,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 180, width, 900);
  ctx.restore();

  try {
    const totem = await loadImage("/art/totem-god.jpg");
    const size = 620;
    coverDraw(ctx, totem, (width - size) / 2, 220, size, size);
  } catch {
    /* still print the wish */
  }

  ctx.textAlign = "center";
  ctx.fillStyle = GOLD;
  ctx.font = '500 36px "Ma Shan Zheng", "Noto Serif SC", serif';
  ctx.fillText("此页已开光", width / 2, 96);
  ctx.font = '700 44px "Ma Shan Zheng", "Noto Serif SC", serif';
  ctx.fillText(`第 ${wish.serial} 号`, width / 2, 160);

  ctx.save();
  ctx.translate(900, 250);
  ctx.rotate((-16 * Math.PI) / 180);
  ctx.strokeStyle = CINN;
  ctx.lineWidth = 8;
  ctx.strokeRect(-110, -48, 220, 96);
  ctx.fillStyle = CINN;
  ctx.font = '700 44px "Noto Serif SC", serif';
  const stamp = luckyMark(wish.serial) ?? wishById(wish.wishId).stamp;
  ctx.fillText(stamp, 0, 16);
  ctx.restore();

  ctx.fillStyle = GOLD;
  ctx.font = '700 40px "Noto Serif SC", serif';
  ctx.fillText("信牛来，牛市一定来", width / 2, 880);

  const spec = wishById(wish.wishId);
  ctx.fillStyle = PAPER;
  ctx.beginPath();
  ctx.roundRect(70, 930, width - 140, 280, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(26,22,16,0.25)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = INK;
  const labelSize = wish.label.length <= 6 ? 72 : wish.label.length <= 10 ? 56 : 44;
  ctx.font = `700 ${labelSize}px "Noto Serif SC", serif';
  wrapCentered(ctx, wish.label, width / 2, 1020, width - 220, labelSize + 12);

  ctx.fillStyle = MUTED;
  ctx.font = '500 28px "Noto Serif SC", serif';
  ctx.fillText(`${sameCount} 人同一贪 · ${wish.nickname || "无名氏"}`, width / 2, 1148);
  ctx.fillStyle = CINN;
  ctx.font = '500 26px "Noto Serif SC", serif';
  ctx.fillText(spec.roast, width / 2, 1190);

  ctx.fillStyle = PAPER;
  ctx.beginPath();
  ctx.roundRect(70, 1260, width - 140, 560, 8);
  ctx.fill();

  const url = publicUrl(`/w/${wish.id}`);
  const qr = await loadImage(
    await QRCode.toDataURL(url, {
      margin: 1,
      width: 360,
      color: { dark: INK, light: PAPER },
      errorCorrectionLevel: "H",
    }),
  );
  const qrSize = 240;
  ctx.drawImage(qr, 130, 1340, qrSize, qrSize);

  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = '700 36px "Noto Serif SC", serif';
  ctx.fillText("扫码也来许一个", 410, 1420);
  ctx.fillStyle = CINN;
  ctx.font = '700 40px "Noto Serif SC", serif';
  ctx.fillText("niulai.org", 410, 1480);
  ctx.fillStyle = MUTED;
  ctx.font = '500 26px "Noto Serif SC", serif';
  ctx.fillText("钱 · 爱情 · 事业", 410, 1540);
  ctx.fillText("号只增不减", 410, 1584);

  ctx.textAlign = "center";
  ctx.fillStyle = CINN;
  ctx.font = '500 28px "Noto Serif SC", serif';
  ctx.fillText("信牛来，牛市一定来", width / 2, 1740);
  ctx.fillStyle = MUTED;
  ctx.font = '400 22px "Noto Sans SC", sans-serif';
  wrapCentered(ctx, url, width / 2, 1784, width - 180, 28);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("blob"))), "image/jpeg", 0.92);
  });
}

function wrapCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const chars = [...text];
  let line = "";
  let cursor = y;
  ctx.textAlign = "center";
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursor);
      line = ch;
      cursor += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursor);
}
