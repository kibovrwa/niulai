import QRCode from "qrcode";
import { publicUrl } from "@/lib/share";
import { luckyMark, wishById } from "@/lib/wish-data";
import { wishTheme } from "@/lib/wish-theme";
import type { WishRow } from "@/lib/wish-fns";

const INK = "#1a1610";
const PAPER = "#f3e6c8";
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
    ]);
  } catch {
    /* system CJK still works */
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
  const theme = wishTheme(wish.wishId);
  const spec = wishById(wish.wishId);
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
    const scene = await loadImage(theme.scene);
    coverDraw(ctx, scene, 0, 0, width, height);
  } catch {
    try {
      const grass = await loadImage("/art/grass.jpg");
      coverDraw(ctx, grass, 0, 0, width, height);
    } catch {
      ctx.fillStyle = "#1c4324";
      ctx.fillRect(0, 0, width, height);
    }
  }

  const night = ctx.createLinearGradient(0, 0, 0, height);
  night.addColorStop(0, "rgba(26,22,16,0.22)");
  night.addColorStop(0.52, "rgba(26,22,16,0.08)");
  night.addColorStop(1, "rgba(26,22,16,0.82)");
  ctx.fillStyle = night;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(240,215,138,0.22)";
  ctx.font = '700 42px "Noto Serif SC", serif';
  theme.bits.forEach((bit, i) => {
    ctx.save();
    ctx.translate(90 + (i % 4) * 250, 180 + (i % 3) * 220);
    ctx.rotate((-18 * Math.PI) / 180);
    ctx.fillText(bit, 0, 0);
    ctx.restore();
  });

  ctx.textAlign = "center";
  ctx.fillStyle = GOLD;
  ctx.font = '500 34px "Ma Shan Zheng", "Noto Serif SC", serif';
  ctx.fillText("此页已开光", width / 2, 88);
  ctx.font = '700 46px "Ma Shan Zheng", "Noto Serif SC", serif';
  ctx.fillText(`第 ${wish.serial} 号`, width / 2, 150);

  const stamp = luckyMark(wish.serial) ?? spec.stamp;
  ctx.save();
  ctx.translate(910, 240);
  ctx.rotate((-16 * Math.PI) / 180);
  ctx.strokeStyle = theme.ink;
  ctx.lineWidth = 8;
  ctx.strokeRect(-112, -50, 224, 100);
  ctx.fillStyle = theme.ink;
  ctx.font = '700 44px "Noto Serif SC", serif';
  ctx.fillText(stamp, 0, 16);
  ctx.restore();

  ctx.fillStyle = GOLD;
  ctx.font = '700 36px "Noto Serif SC", serif';
  ctx.fillText("信牛来，牛市一定来", width / 2, 900);

  ctx.fillStyle = PAPER;
  ctx.beginPath();
  ctx.roundRect(70, 940, width - 140, 300, 8);
  ctx.fill();

  ctx.fillStyle = INK;
  const labelSize = wish.label.length <= 6 ? 72 : wish.label.length <= 10 ? 54 : 42;
  ctx.font = `700 ${labelSize}px "Noto Serif SC", serif';
  wrapCentered(ctx, wish.label, width / 2, 1020, width - 220, labelSize + 12);

  ctx.fillStyle = MUTED;
  ctx.font = '500 26px "Noto Serif SC", serif';
  ctx.fillText(`${sameCount} 人同一贪 · ${wish.nickname || "无名氏"}`, width / 2, 1144);
  ctx.fillStyle = theme.ink;
  ctx.font = '600 28px "Noto Serif SC", serif';
  ctx.fillText(theme.boast, width / 2, 1194);

  ctx.fillStyle = PAPER;
  ctx.beginPath();
  ctx.roundRect(70, 1280, width - 140, 540, 8);
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
  ctx.drawImage(qr, 130, 1355, 230, 230);

  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = '700 34px "Noto Serif SC", serif';
  ctx.fillText("扫码也来许这个", 400, 1430);
  ctx.fillStyle = theme.ink;
  ctx.font = '700 40px "Noto Serif SC", serif';
  ctx.fillText("niulai.org", 400, 1490);
  ctx.fillStyle = MUTED;
  ctx.font = '500 26px "Noto Serif SC", serif';
  ctx.fillText(theme.bits.join(" · "), 400, 1550);
  ctx.fillText("号只增不减", 400, 1594);

  ctx.textAlign = "center";
  ctx.fillStyle = theme.ink;
  ctx.font = '500 28px "Noto Serif SC", serif';
  ctx.fillText("信牛来，牛市一定来", width / 2, 1748);
  ctx.fillStyle = MUTED;
  ctx.font = '400 22px "Noto Sans SC", sans-serif';
  wrapCentered(ctx, url, width / 2, 1790, width - 180, 28);

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
