#!/usr/bin/env python3
"""Build the 17 NBTI result cards: distinct cow + punch + QR + niulai.org."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "art" / "types"
COWS = ROOT / "public" / "art" / "cows"
QRS = ROOT / "public" / "art" / "qr"
FALLBACK = ROOT / "public" / "art" / "totem-god.jpg"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 800, 1180
PAPER = (255, 255, 255, 255)
INK = (26, 22, 16, 255)
MUTED = (107, 90, 66, 255)
CINN = (155, 43, 26, 255)
FONT_PATHS = [
    Path("/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"),
    Path("/workspace/fonts/NotoSerifSC-Bold.otf"),
    Path("/usr/share/fonts/opentype/unifont/unifont.otf"),
]

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


def font(n: int) -> ImageFont.FreeTypeFont:
    for path in FONT_PATHS:
        if path.exists():
            try:
                return ImageFont.truetype(str(path), n)
            except OSError:
                continue
    return ImageFont.load_default()


def load_cow(code: str) -> Image.Image:
    src = COWS / f"{code}.jpg"
    if not src.exists():
        src = FALLBACK
    im = Image.open(src).convert("RGBA")
    # keep shrine scene, just fit the frame
    im.thumbnail((640, 700), Image.Resampling.LANCZOS)
    return im


def load_qr(code: str) -> Image.Image:
    path = QRS / f"{code}.png"
    qr = Image.open(path).convert("RGBA")
    qr.thumbnail((148, 148), Image.Resampling.NEAREST)
    return qr


def make(code: str, name: str, head: str, punch: str, tag: str, foot: str, url: str) -> Image.Image:
    im = Image.new("RGBA", (W, H), PAPER)
    d = ImageDraw.Draw(im)
    d.text((W / 2, 52), head, font=font(28), fill=MUTED, anchor="mm")
    name_size = 64 if len(name) <= 4 else 52 if len(name) <= 6 else 42
    d.text((W / 2, 122), name, font=font(name_size), fill=INK, anchor="mm")
    d.text((W / 2, 178), tag, font=font(34), fill=CINN, anchor="mm")

    body = load_cow(code)
    top = 210
    im.alpha_composite(body, ((W - body.width) // 2, top))

    punch_size = 30 if len(punch) < 22 else 24
    d.text((W / 2, 930), punch, font=font(punch_size), fill=INK, anchor="mm")
    d.text((W / 2, 972), foot, font=font(20), fill=CINN, anchor="mm")

    d.line((80, 1000, W - 80, 1000), fill=(217, 203, 184, 255), width=2)
    qr = load_qr(code)
    qr_x, qr_y = 80, 1020
    pad = Image.new("RGBA", (qr.width + 8, qr.height + 8), PAPER)
    pad.alpha_composite(qr, (4, 4))
    im.alpha_composite(pad, (qr_x, qr_y))
    d.text((qr_x + qr.width + 28, qr_y + 36), "扫码测你的牛相", font=font(26), fill=INK, anchor="lm")
    d.text((qr_x + qr.width + 28, qr_y + 78), "niulai.org", font=font(24), fill=CINN, anchor="lm")
    d.text((qr_x + qr.width + 28, qr_y + 114), url, font=font(16), fill=MUTED, anchor="lm")
    return im.convert("RGB")


def main() -> None:
    for code, (name, zh, en) in CARDS.items():
        tag = "本尊" if code == "NLBN" else code
        url = f"https://niulai.org/ce?from={code}"
        make(code, name, "你的牛相是：", zh, tag, "牛来许愿池", url).save(
            OUT / f"{code}.jpg", "JPEG", quality=90
        )
        make(code, name, "You are:", en, "niulai" if code == "NLBN" else code, "niulai.org", url).save(
            OUT / f"{code}.en.jpg", "JPEG", quality=90
        )
        print(code)


if __name__ == "__main__":
    main()
