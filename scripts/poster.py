#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

SRC = Path("/workspace/public/art/totem-god.jpg")
QR = Path("/tmp/niulai-qr.png")
OUT = Path("/workspace/public/poster.jpg")
OG = Path("/workspace/public/og-card.jpg")
W, H = 1080, 1920
INK = (18, 14, 10)
GOLD = (232, 186, 74)
CINN = (176, 42, 28)
PAPER = (255, 244, 214)
FONT = "/workspace/fonts/NotoSerifSC-Bold.otf"


def font(n: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, n)


def cow() -> Image.Image:
    im = Image.open(SRC).convert("RGBA")
    im = im.crop((30, 50, im.width - 30, int(im.height * 0.90)))
    im.thumbnail((780, 920), Image.Resampling.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.16)
    im = ImageEnhance.Color(im).enhance(1.08)
    return im


def main() -> None:
    layer = Image.new("RGBA", (W, H), (*INK, 255))
    halo = Image.new("RGBA", (900, 900), (0, 0, 0, 0))
    hd = ImageDraw.Draw(halo)
    hd.ellipse((30, 30, 870, 870), fill=(232, 186, 74, 78))
    halo = halo.filter(ImageFilter.GaussianBlur(26))
    layer.alpha_composite(halo, ((W - 900) // 2, 360))
    c = cow()
    layer.alpha_composite(c, ((W - c.width) // 2, 380))

    qr = Image.open(QR).convert("RGBA").resize((220, 220), Image.Resampling.NEAREST)
    pad = Image.new("RGBA", (244, 244), (*PAPER, 255))
    pad.alpha_composite(qr, (12, 12))
    layer.alpha_composite(pad, (W - 244 - 64, H - 244 - 86))

    d = ImageDraw.Draw(layer)
    d.rectangle((22, 22, W - 23, H - 23), outline=GOLD, width=12)
    d.rectangle((42, 42, W - 43, H - 43), outline=(*CINN, 180), width=2)
    d.text((W / 2, 88), "开  光", font=font(40), fill=GOLD, anchor="mm")
    d.text((W / 2, 150), "牛来许愿池", font=font(36), fill=GOLD, anchor="mm")
    d.text((W / 2, 280), "测你是哪种牛", font=font(92), fill=PAPER, anchor="mm")
    d.text((W / 2, 370), "八题。一张单。扫了就能测。", font=font(32), fill=GOLD, anchor="mm")
    d.text((W / 2, 1360), "核动力 · 美牛牛 · 拖拉机", font=font(36), fill=GOLD, anchor="mm")
    d.rounded_rectangle((W / 2 - 170, 1410, W / 2 + 170, 1488), 6, outline=CINN, width=5)
    d.text((W / 2, 1449), "本尊在此", font=font(40), fill=CINN, anchor="mm")
    d.text((80, H - 200), "扫码开测", font=font(40), fill=PAPER, anchor="lm")
    d.text((80, H - 140), "niulai.org", font=font(34), fill=GOLD, anchor="lm")
    d.text((80, H - 88), "长按识别 · 转发给下一个人", font=font(26), fill=(200, 176, 120), anchor="lm")

    rgb = layer.convert("RGB")
    rgb.save(OUT, "JPEG", quality=90)

    # square share thumb, same type, with QR
    og = rgb.crop((0, 200, W, 200 + W)).resize((800, 800), Image.Resampling.LANCZOS)
    og.save(OG, "JPEG", quality=90)
    print(OUT, OUT.stat().st_size, OG.stat().st_size)


if __name__ == "__main__":
    main()
