import QRCode from "qrcode";
import { publicUrl } from "@/lib/share";
import { luckyMark, wishById } from "@/lib/wish-data";
import type { WishRow } from "@/lib/wish-fns";

const INK = "#1a1610";
const PAPER = "#f3e6c8";
const CINN = "#9b2b1a";
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
      document.fonts.load('72px "Noto Serif SC"'),
      document.fonts.load('40px "Ma Shan Zheng"'),
      document.fonts.load('28px "Noto Sans SC"'),
    ]);
  } catch {
    /* system CJK still works on canvas */
  }
}

export async function renderWishPoster(wish: WishRow, sameCount: number): Promise<Blob> {
  await waitFonts();
  const width = 1080;
  const height = 1440;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = CINN;
  ctx.lineWidth = 16;
  ctx.strokeRect(28, 28, width - 56, height - 56);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  ctx.fillStyle = MUTED;
  ctx.font = '500 36px "Ma Shan Zheng", "Noto Serif SC", serif';
  ctx.textAlign = "center";
  ctx.fillText(`第 ${wish.serial} 号`, width / 2, 140);

  try {
    const totem = await loadImage("/art/totem-god.jpg");
    const size = 280;
    const x = (width - size) / 2;
    const y = 180;
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(totem, x, y, size, size);
    ctx.restore();
    ctx.strokeStyle = CINN;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(width / 2, y + size / 2, size / 2 + 4, 0, Math.PI * 2);
    ctx.stroke();
  } catch {
    /* still print the wish */
  }

  ctx.fillStyle = INK;
  const labelSize = wish.label.length <= 6 ? 88 : wish.label.length <= 10 ? 68 : 52;
  ctx.font = `700 ${labelSize}px "Noto Serif SC", serif`;
  wrapCentered(ctx, wish.label, width / 2, 560, width - 160, labelSize + 16);

  ctx.fillStyle = MUTED;
  ctx.font = '500 30px "Noto Serif SC", serif';
  ctx.fillText(`${sameCount} 人同一贪 · ${wish.nickname || "无名氏"}`, width / 2, 720);

  const spec = wishById(wish.wishId);
  ctx.fillStyle = CINN;
  ctx.font = '500 28px "Noto Serif SC", serif';
  ctx.fillText(spec.roast, width / 2, 780);

  const stamp = luckyMark(wish.serial) ?? spec.stamp;
  ctx.save();
  ctx.translate(860, 200);
  ctx.rotate((-14 * Math.PI) / 180);
  ctx.strokeStyle = CINN;
  ctx.lineWidth = 6;
  ctx.strokeRect(-90, -40, 180, 80);
  ctx.fillStyle = CINN;
  ctx.font = '700 36px "Noto Serif SC", serif';
  ctx.fillText(stamp, 0, 14);
  ctx.restore();

  const url = publicUrl(`/w/${wish.id}`);
  const qr = await loadImage(
    await QRCode.toDataURL(url, {
      margin: 1,
      width: 360,
      color: { dark: INK, light: PAPER },
      errorCorrectionLevel: "H",
    }),
  );
  const qrSize = 220;
  ctx.drawImage(qr, (width - qrSize) / 2, 880, qrSize, qrSize);

  ctx.fillStyle = INK;
  ctx.font = '600 34px "Noto Serif SC", serif';
  ctx.fillText("扫码也来许一个", width / 2, 1160);
  ctx.fillStyle = CINN;
  ctx.font = '500 30px "Noto Serif SC", serif';
  ctx.fillText("牛来许愿池 · niulai.org", width / 2, 1210);
  ctx.fillStyle = MUTED;
  ctx.font = '400 24px "Noto Sans SC", sans-serif';
  wrapCentered(ctx, url, width / 2, 1260, width - 140, 32);

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
