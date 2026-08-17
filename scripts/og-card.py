#!/usr/bin/env python3
from pathlib import Path
import math

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/og-card.jpg")
SIZE = 800
INK = (18, 14, 10)
GOLD = (232, 186, 74)
CINN = (176, 42, 28)
PAPER = (255, 244, 214)


def font(n):
    for p in (
        "/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
    ):
        try:
            return ImageFont.truetype(p, n)
        except OSError:
            continue
    return ImageFont.load_default()


def cow():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    im = im.crop((40, 80, w - 40, int(h * 0.86)))
    im.thumbnail((620, 620), Image.Resampling.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.18)
    im = ImageEnhance.Color(im).enhance(1.12)
    im = ImageEnhance.Brightness(im).enhance(1.06)
    return im


def rays(size: int) -> Image.Image:
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = cy = size // 2
    for i in range(28):
        ang = i * (math.pi / 14)
        x = cx + math.cos(ang) * size
        y = cy + math.sin(ang) * size
        d.line((cx, cy, x, y), fill=(232, 186, 74, 38), width=18)
    layer = layer.filter(ImageFilter.GaussianBlur(10))
    return layer


def halo() -> Image.Image:
    s = 520
    layer = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((20, 20, s - 20, s - 20), fill=(232, 186, 74, 70))
    d.ellipse((90, 90, s - 90, s - 90), fill=(255, 220, 120, 40))
    return layer.filter(ImageFilter.GaussianBlur(18))


def main():
    im = Image.new("RGB", (SIZE, SIZE), INK)
    base = Image.new("RGBA", (SIZE, SIZE), (*INK, 255))
    base.alpha_composite(rays(SIZE), (0, 0))
    h = halo()
    base.alpha_composite(h, ((SIZE - h.width) // 2, 70))
    c = cow()
    base.alpha_composite(c, ((SIZE - c.width) // 2, 46))
    d = ImageDraw.Draw(base)
    d.rectangle((0, 0, SIZE - 1, SIZE - 1), outline=GOLD, width=10)
    d.rectangle((18, 18, SIZE - 19, SIZE - 19), outline=(176, 42, 28, 180), width=2)
    d.text((SIZE / 2, 48), "开  光", font=font(36), fill=GOLD, anchor="mm")
    d.text((SIZE / 2, 668), "测你是哪种牛", font=font(72), fill=PAPER, anchor="mm")
    d.text((SIZE / 2, 738), "牛来许愿池", font=font(40), fill=GOLD, anchor="mm")
    d.rounded_rectangle((SIZE / 2 - 70, 766, SIZE / 2 + 70, 812), 4, outline=CINN, width=4)
    d.text((SIZE / 2, 789), "本尊在此", font=font(26), fill=CINN, anchor="mm")
    base.convert("RGB").save(OUT, "JPEG", quality=90)
    print(OUT, OUT.stat().st_size)


if __name__ == "__main__":
    main()
