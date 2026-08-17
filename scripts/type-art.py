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

# name stays Chinese on both cards. Punch follows locale.
CARDS = {
    "GMCL": ("六千牛", "六千不到，我不睡。", "No 6000, no sleep."),
    "GMCD": ("套死牛", "满了。当它没开盘。", "Full. Closed. For me."),
    "GMXL": ("美牛牛", "我的白天，是别人的收盘。", "My morning is their close."),
    "GMXD": ("gay里gay牛", "我不是弯。我是抽象。", "Not bent. Abstract."),
    "GKCL": ("踏空牛", "我不是怕亏。我是眼红。", "Not fear. Envy."),
    "GKCD": ("牛斯克", "我先发射。仓自己会来。", "Launch first. The book follows."),
    "GKXL": ("牛鼻子老道", "我先问道。再开盘。", "Ask the dao. Then the tape."),
    "GKXD": ("大阉牛", "该顶的没顶。", "Never charged."),
    "SMCL": ("牛蛛侠", "我先吐丝。再接盘。", "Web first. Then catch."),
    "SMCD": ("牛魔王", "我不是散户。我是王。", "Not retail. The king."),
    "SMXL": ("核动力牛", "神不用赐。我会加班。", "No blessing. I'll overtime."),
    "SMXD": ("吸牛", "我不是拿着。我是吸着。", "Not holding. Sucking."),
    "SKCL": ("绊倒牛", "倒了。还是牛。", "Fell. Still a bull."),
    "SKCD": ("牛跃亭", "我先走。你们在粪里拿着。", "I leave. You hold the dung."),
    "SKXL": ("拖拉机牛", "我在跳拖拉机。盘也是。", "Tractor dance. Tractor tape."),
    "SKXD": ("牵牛花", "我开花。你来牵。", "I bloom. You pull."),
    "NLBN": ("牛来本牛", "我就是它。", "I am it."),
}


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


def cow(src=SRC, crop=True):
    im = Image.open(src).convert("RGBA")
    if crop:
        w, h = im.size
        im = im.crop((20, 160, w - 20, h - 40))
    im.thumbnail((560, 620), Image.Resampling.LANCZOS)
    return im


COW = cow()
TRACTOR = (
    cow(Path("/workspace/public/art/cow-tractor.png"), crop=False)
    if Path("/workspace/public/art/cow-tractor.png").exists()
    else COW
)


def make(code: str, name: str, head: str, punch: str, tag: str, foot: str) -> Image.Image:
    im = Image.new("RGBA", (W, H), PAPER)
    d = ImageDraw.Draw(im)
    d.text((W / 2, 56), head, font=font(28), fill=MUTED, anchor="mm")
    name_size = 64 if len(name) <= 4 else 52 if len(name) <= 6 else 42
    d.text((W / 2, 130), name, font=font(name_size), fill=INK, anchor="mm")
    d.text((W / 2, 188), tag, font=font(36), fill=CINN, anchor="mm")
    body = TRACTOR if code == "SKXL" else COW
    im.alpha_composite(body, ((W - body.width) // 2, 230))
    punch_size = 30 if len(punch) < 22 else 24
    d.text((W / 2, 930), punch, font=font(punch_size), fill=MUTED, anchor="mm")
    d.text((W / 2, 972), foot, font=font(18), fill=CINN, anchor="mm")
    return im.convert("RGB")


def main():
    for code, (name, zh, en) in CARDS.items():
        tag = "本尊" if code == "NLBN" else code
        make(code, name, "你的牛相是：", zh, tag, "牛来许愿池").save(OUT / f"{code}.jpg", "JPEG", quality=88)
        make(code, name, "You are:", en, "niulai" if code == "NLBN" else code, "niulai.org").save(
            OUT / f"{code}.en.jpg", "JPEG", quality=88
        )
        print(code)


if __name__ == "__main__":
    main()
