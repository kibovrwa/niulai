#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/art/types")
OUT.mkdir(parents=True, exist_ok=True)
SIZE = 800


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


def cow_cut():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    # keep the standing calf, drop extra sky
    box = (40, 180, w - 40, h - 80)
    im = im.crop(box)
    im.thumbnail((560, 720), Image.Resampling.LANCZOS)
    return im


def card(bg):
    return Image.new("RGBA", (SIZE, SIZE), bg)


def paste_c(base, piece, xy, scale=1.0, rotate=0):
    p = piece.copy()
    if scale != 1:
        nw = max(8, int(p.width * scale))
        nh = max(8, int(p.height * scale))
        p = p.resize((nw, nh), Image.Resampling.LANCZOS)
    if rotate:
        p = p.rotate(rotate, expand=True, resample=Image.Resampling.BICUBIC)
    x, y = xy
    base.alpha_composite(p, (int(x - p.width / 2), int(y - p.height / 2)))


def wash(im, color, a):
    o = Image.new("RGBA", im.size, (*color, a))
    return Image.alpha_composite(im, o)


COW = cow_cut()


def GMCL():
    im = card((18, 16, 12, 255))
    d = ImageDraw.Draw(im)
    d.text((SIZE // 2, 210), "6000", font=font(180), fill=(212, 160, 23, 230), anchor="mm")
    paste_c(im, COW, (400, 500), 0.95)
    return im


def GMCD():
    im = card((40, 12, 12, 255))
    paste_c(im, ImageEnhance.Brightness(COW).enhance(0.55), (400, 430), 0.9)
    d = ImageDraw.Draw(im)
    d.ellipse((90, 90, 710, 710), outline=(196, 58, 34, 255), width=28)
    d.ellipse((130, 130, 670, 670), outline=(155, 43, 26, 180), width=8)
    return im


def GMXL():
    im = card((8, 16, 36, 255))
    d = ImageDraw.Draw(im)
    d.ellipse((-80, 520, 880, 980), fill=(12, 40, 80, 255))
    d.ellipse((560, 80, 720, 240), fill=(240, 210, 140, 220))
    paste_c(im, COW, (400, 430), 0.92)
    return wash(im, (10, 20, 60), 40)


def GMXD():
    im = card((250, 236, 220, 255))
    paste_c(im, COW, (400, 430), 0.9)
    d = ImageDraw.Draw(im)
    for c, r in [((255, 80, 160, 200), (80, 80, 200, 200)), ((120, 80, 220, 180), (580, 60, 740, 220)), ((255, 180, 40, 200), (60, 560, 200, 700))]:
        d.ellipse(r, fill=c)
    d.polygon([(620, 560), (660, 680), (580, 680)], fill=(255, 90, 170, 220))
    return im


def GKCL():
    im = card((240, 236, 220, 255))
    d = ImageDraw.Draw(im)
    d.rectangle((0, 560, 800, 800), fill=(60, 110, 50, 255))
    paste_c(im, COW, (400, 260), 0.72)
    d.polygon([(560, 520), (720, 430), (720, 470), (780, 430), (740, 540), (700, 500)], fill=(40, 170, 70, 255))
    return im


def GKCD():
    im = card((232, 228, 214, 255))
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, 800, 220), fill=(30, 36, 28, 255))
    d.text((400, 110), "—— 榜 ——", font=font(42), fill=(212, 160, 23, 220), anchor="mm")
    paste_c(im, COW, (400, 500), 0.78)
    return im


def GKXL():
    im = card((246, 236, 210, 255))
    paste_c(im, COW, (400, 450), 0.88)
    d = ImageDraw.Draw(im)
    d.line((180, 620, 180, 420), fill=(90, 40, 20, 255), width=10)
    d.ellipse((150, 360, 210, 430), fill=(230, 80, 40, 230))
    d.polygon([(190, 380), (250, 250), (210, 250), (280, 140), (160, 280), (200, 280)], fill=(210, 210, 210, 180))
    d.rectangle((520, 560, 700, 680), outline=(155, 43, 26, 255), width=6)
    return im


def GKXD():
    im = card((210, 200, 170, 255))
    d = ImageDraw.Draw(im)
    d.rectangle((0, 520, 800, 800), fill=(70, 110, 50, 255))
    sitting = COW.crop((0, int(COW.height * 0.18), COW.width, COW.height))
    paste_c(im, sitting, (400, 470), 0.95)
    d.line((240, 280, 300, 220), fill=(40, 30, 20, 255), width=10)
    d.line((500, 220, 560, 280), fill=(40, 30, 20, 255), width=10)
    return im


def SMCL():
    im = card((245, 236, 214, 255))
    paste_c(im, COW, (400, 480), 0.88)
    d = ImageDraw.Draw(im)
    d.polygon([(420, 40), (470, 280), (390, 270)], fill=(180, 180, 190, 255))
    d.polygon([(390, 260), (500, 280), (360, 330)], fill=(90, 90, 100, 255))
    return im


def SMCD():
    im = card((20, 14, 10, 255))
    d = ImageDraw.Draw(im)
    d.ellipse((160, 80, 640, 280), fill=(196, 58, 34, 255))
    d.rectangle((280, 40, 520, 160), fill=(212, 160, 23, 255))
    paste_c(im, COW, (400, 470), 0.92)
    return im


def SMXL():
    im = card((12, 28, 16, 255))
    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((120, 80, 680, 720), fill=(80, 220, 90, 70))
    im = Image.alpha_composite(im, glow.filter(ImageFilter.GaussianBlur(24)))
    paste_c(im, COW, (400, 430), 0.92)
    d = ImageDraw.Draw(im)
    d.ellipse((330, 70, 470, 210), outline=(180, 255, 120, 230), width=10)
    d.line((400, 100, 400, 180), fill=(180, 255, 120, 230), width=8)
    d.line((360, 140, 440, 140), fill=(180, 255, 120, 230), width=8)
    return im


def SMXD():
    im = card((40, 16, 16, 255))
    paste_c(im, COW, (400, 450), 0.9)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((300, 70, 500, 240), 16, outline=(212, 160, 23, 255), width=14)
    d.arc((330, 20, 470, 120), 200, 340, fill=(212, 160, 23, 255), width=14)
    return im


def SKCL():
    im = card((236, 228, 200, 255))
    d = ImageDraw.Draw(im)
    d.rectangle((0, 560, 800, 800), fill=(90, 70, 40, 255))
    paste_c(im, COW, (430, 460), 0.95, rotate=78)
    return im


def SKCD():
    im = card((243, 230, 200, 255))
    paste_c(im, COW, (400, 430), 0.88)
    stamp = Image.new("RGBA", (360, 160), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stamp)
    sd.rounded_rectangle((8, 8, 352, 152), 8, outline=(180, 30, 24, 255), width=10)
    sd.text((180, 80), "来", font=font(90), fill=(180, 30, 24, 230), anchor="mm")
    stamp = stamp.rotate(-18, expand=True, resample=Image.Resampling.BICUBIC)
    im.alpha_composite(stamp, (400, 500))
    return im


def SKXL():
    im = card((236, 228, 208, 255))
    paste_c(im, COW, (270, 430), 0.72)
    mate = ImageOps.mirror(COW)
    paste_c(im, mate, (540, 450), 0.68)
    return im


def SKXD():
    im = card((18, 16, 20, 255))
    d = ImageDraw.Draw(im)
    d.polygon([(0, 0), (220, 0), (0, 280)], fill=(140, 30, 28, 255))
    d.polygon([(800, 0), (580, 0), (800, 280)], fill=(140, 30, 28, 255))
    paste_c(im, COW, (400, 450), 0.88)
    d.rectangle((300, 640, 500, 720), fill=(243, 230, 200, 255))
    return im


def NLBN():
    im = card((12, 10, 8, 255))
    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((80, 40, 720, 760), fill=(212, 160, 23, 70))
    im = Image.alpha_composite(im, glow.filter(ImageFilter.GaussianBlur(28)))
    paste_c(im, COW, (400, 420), 1.05)
    d = ImageDraw.Draw(im)
    d.ellipse((180, 40, 620, 200), outline=(212, 160, 23, 220), width=10)
    return im


FNS = {
    "GMCL": GMCL,
    "GMCD": GMCD,
    "GMXL": GMXL,
    "GMXD": GMXD,
    "GKCL": GKCL,
    "GKCD": GKCD,
    "GKXL": GKXL,
    "GKXD": GKXD,
    "SMCL": SMCL,
    "SMCD": SMCD,
    "SMXL": SMXL,
    "SMXD": SMXD,
    "SKCL": SKCL,
    "SKCD": SKCD,
    "SKXL": SKXL,
    "SKXD": SKXD,
    "NLBN": NLBN,
}


def main():
    for code, fn in FNS.items():
        im = fn().convert("RGB")
        path = OUT / f"{code}.jpg"
        im.save(path, "JPEG", quality=86)
        print(path, im.size)


if __name__ == "__main__":
    main()
