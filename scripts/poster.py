#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/poster.jpg")
W, H = 1080, 1440
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


def main():
    im = Image.new("RGB", (W, H), INK)
    layer = Image.new("RGBA", (W, H), (*INK, 255))
    cow = Image.open(SRC).convert("RGBA")
    cow = cow.crop((40, 60, cow.width - 40, int(cow.height * 0.88)))
    cow.thumbnail((820, 980), Image.Resampling.LANCZOS)
    cow = ImageEnhance.Contrast(cow).enhance(1.16)
    cow = ImageEnhance.Color(cow).enhance(1.1)
    halo = Image.new("RGBA", (900, 900), (0, 0, 0, 0))
    hd = ImageDraw.Draw(halo)
    hd.ellipse((40, 40, 860, 860), fill=(232, 186, 74, 70))
    halo = halo.filter(ImageFilter.GaussianBlur(28))
    layer.alpha_composite(halo, ((W - 900) // 2, 180))
    layer.alpha_composite(cow, ((W - cow.width) // 2, 210))
    d = ImageDraw.Draw(layer)
    d.rectangle((24, 24, W - 25, H - 25), outline=GOLD, width=10)
    d.rectangle((44, 44, W - 45, H - 45), outline=(176, 42, 28, 160), width=2)
    d.text((W / 2, 92), "开  光", font=font(44), fill=GOLD, anchor="mm")
    d.text((W / 2, 160), "牛来许愿池", font=font(36), fill=GOLD, anchor="mm")
    d.text((W / 2, 1120), "测你是哪种牛", font=font(88), fill=PAPER, anchor="mm")
    d.text((W / 2, 1220), "核动力 · 美牛牛 · 拖拉机", font=font(36), fill=GOLD, anchor="mm")
    d.rounded_rectangle((W / 2 - 160, 1270, W / 2 + 160, 1330), 6, outline=CINN, width=4)
    d.text((W / 2, 1300), "本尊在此", font=font(34), fill=CINN, anchor="mm")
    d.text((W / 2, 1380), "niulai.org", font=font(32), fill=GOLD, anchor="mm")
    layer.convert("RGB").save(OUT, "JPEG", quality=90)
    print(OUT, OUT.stat().st_size)


if __name__ == "__main__":
    main()
