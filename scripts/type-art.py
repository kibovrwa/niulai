#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/art/types")
OUT.mkdir(parents=True, exist_ok=True)
SIZE = 800
PAPER = (243, 230, 200, 255)
INK = (26, 22, 16, 255)
CINN = (155, 43, 26, 255)
GOLD = (196, 140, 30, 255)

SEALS = {
    "GMCL": "六千",
    "GMCD": "套死",
    "GMXL": "大海",
    "GMXD": "抽象",
    "GKCL": "踏空",
    "GKCD": "斯克",
    "GKXL": "老道",
    "GKXD": "阉",
    "SMCL": "接刀",
    "SMCD": "魔王",
    "SMXL": "核",
    "SMXD": "犟",
    "SKCL": "绊倒",
    "SKCD": "跃亭",
    "SKXL": "搭子",
    "SKXD": "看戏",
    "NLBN": "本尊",
}


def font(n):
    for p in (
        "/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ):
        try:
            return ImageFont.truetype(p, n)
        except OSError:
            continue
    return ImageFont.load_default()


def cow():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    im = im.crop((20, 160, w - 20, h - 40))
    im.thumbnail((620, 720), Image.Resampling.LANCZOS)
    return im


COW = cow()


def make(code: str) -> Image.Image:
    im = Image.new("RGBA", (SIZE, SIZE), PAPER)
    d = ImageDraw.Draw(im)
    d.rectangle((18, 18, SIZE - 19, SIZE - 19), outline=INK, width=3)
    d.rectangle((28, 28, SIZE - 29, SIZE - 29), outline=GOLD, width=1)
    x = (SIZE - COW.width) // 2
    y = 70
    im.alpha_composite(COW, (x, y))
    seal = SEALS[code]
    box_w = 128 if len(seal) >= 2 else 96
    sx, sy = SIZE - 36 - box_w, SIZE - 36 - 96
    color = GOLD if code == "NLBN" else CINN
    d.rounded_rectangle((sx, sy, sx + box_w, sy + 88), 4, outline=color, width=5)
    d.text((sx + box_w / 2, sy + 44), seal, font=font(36), fill=color, anchor="mm")
    return im.convert("RGB")


def main():
    for code in SEALS:
        path = OUT / f"{code}.jpg"
        make(code).save(path, "JPEG", quality=88)
        print(path)


if __name__ == "__main__":
    main()
