#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/art/types")
OUT.mkdir(parents=True, exist_ok=True)
W, H = 800, 1000
PAPER = (255, 255, 255, 255)
INK = (26, 22, 16, 255)
MUTED = (107, 90, 66, 255)
CINN = (155, 43, 26, 255)

CARDS = {
    "GMCL": ("六千牛", "六千不到，我不睡。"),
    "GMCD": ("套死牛", "满了。当它没开盘。"),
    "GMXL": ("美牛牛", "我的白天，是别人的收盘。"),
    "GMXD": ("gay里gay牛", "我不是弯。我是抽象。"),
    "GKCL": ("踏空牛", "我不是怕亏。我是眼红。"),
    "GKCD": ("牛斯克", "我先发射。仓自己会来。"),
    "GKXL": ("牛鼻子老道", "我先问道。再开盘。"),
    "GKXD": ("大阉牛", "该顶的没顶。"),
    "SMCL": ("接刀牛", "我来托。托的是自己。"),
    "SMCD": ("牛魔王", "我不是散户。我是王。"),
    "SMXL": ("核动力牛", "神不用赐。我会加班。"),
    "SMXD": ("犟牛", "不卖是品德。账单更硬。"),
    "SKCL": ("绊倒牛", "倒了。还是牛。"),
    "SKCD": ("牛跃亭", "我先走。你们先拿着。"),
    "SKXL": ("搭子牛", "发这张，就是在招人。"),
    "SKXD": ("为牛粪窒息", "我不是看戏。我是埋进去了。"),
    "NLBN": ("牛来本牛", "我就是它。"),
}


def font(n):
    for p in (
        "/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
        "/usr/share/fonts/truetype/noto/NotoSerifCJK-Bold.ttc",
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
    im.thumbnail((560, 620), Image.Resampling.LANCZOS)
    return im


COW = cow()


def make(code: str) -> Image.Image:
    name, punch = CARDS[code]
    im = Image.new("RGBA", (W, H), PAPER)
    d = ImageDraw.Draw(im)
    d.text((W / 2, 56), "你的牛相是：", font=font(28), fill=MUTED, anchor="mm")
    name_size = 64 if len(name) <= 4 else 52 if len(name) <= 6 else 42
    d.text((W / 2, 130), name, font=font(name_size), fill=INK, anchor="mm")
    d.text((W / 2, 188), code if code != "NLBN" else "本尊", font=font(36), fill=CINN, anchor="mm")
    im.alpha_composite(COW, ((W - COW.width) // 2, 230))
    d.text((W / 2, 930), punch, font=font(30), fill=MUTED, anchor="mm")
    return im.convert("RGB")


def main():
    for code in CARDS:
        path = OUT / f"{code}.jpg"
        make(code).save(path, "JPEG", quality=88)
        print(path)


if __name__ == "__main__":
    main()
