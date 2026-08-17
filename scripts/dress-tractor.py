#!/usr/bin/env python3
"""拖拉机牛: same cow pixels only, skinny tractor-dance pose."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/art/cow-tractor.png")


def cow_only(im: Image.Image) -> Image.Image:
    px = im.load()
    w, h = im.size
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            # yellow fur / pink nose / dark hooves
            yellow = r > 140 and g > 90 and b < 140 and r > b + 20
            pink = r > 140 and g > 70 and b > 70 and r > g and abs(r - g) < 90
            hoof = r < 90 and g < 80 and b < 70 and y > h * 0.55
            if yellow or pink or hoof:
                op[x, y] = (r, g, b, 255)
    return out


def paste(dst, part, xy, scale=1.0, rot=0, slim=1.0):
    p = part.copy()
    if slim != 1.0:
        p = p.resize((max(8, int(p.width * slim)), p.height), Image.Resampling.LANCZOS)
    if scale != 1.0:
        p = p.resize((max(8, int(p.width * scale)), max(8, int(p.height * scale))), Image.Resampling.LANCZOS)
    if rot:
        p = p.rotate(rot, resample=Image.Resampling.BICUBIC, expand=True)
    dst.alpha_composite(p, (int(xy[0] - p.width / 2), int(xy[1] - p.height / 2)))


def main():
    raw = Image.open(SRC).convert("RGBA")
    cow = cow_only(raw)
    w, h = cow.size
    body = cow.crop((int(w * 0.16), int(h * 0.10), int(w * 0.84), int(h * 0.86)))
    body = ImageEnhance.Contrast(body).enhance(1.08)
    bw, bh = body.size

    head = body.crop((int(bw * 0.16), 0, int(bw * 0.84), int(bh * 0.36)))
    torso = body.crop((int(bw * 0.22), int(bh * 0.30), int(bw * 0.78), int(bh * 0.58)))
    arm_l = body.crop((0, int(bh * 0.34), int(bw * 0.30), int(bh * 0.58)))
    arm_r = body.crop((int(bw * 0.70), int(bh * 0.34), bw, int(bh * 0.58)))
    leg_l = body.crop((int(bw * 0.20), int(bh * 0.54), int(bw * 0.50), bh))
    leg_r = body.crop((int(bw * 0.50), int(bh * 0.54), int(bw * 0.80), bh))

    W, H = 900, 1200
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    paste(canvas, leg_r, (340, 1000), scale=1.15, rot=22, slim=0.72)
    paste(canvas, leg_l, (580, 960), scale=1.18, rot=-32, slim=0.72)
    paste(canvas, torso, (420, 640), scale=1.12, rot=-18, slim=0.68)
    paste(canvas, arm_r, (250, 660), scale=1.15, rot=48, slim=0.8)
    paste(canvas, arm_l, (660, 610), scale=1.2, rot=-58, slim=0.8)
    paste(canvas, head, (390, 300), scale=1.2, rot=-10, slim=0.92)

    clothes = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(clothes)
    d.polygon([(320, 480), (530, 455), (555, 710), (300, 730)], fill=(40, 44, 50, 230))
    for i, col in enumerate(((196, 42, 42, 235), (224, 224, 228, 235), (196, 42, 42, 235), (68, 72, 78, 235))):
        y = 530 + i * 26
        d.polygon([(332, y), (538, y - 10), (540, y + 12), (330, y + 22)], fill=col)
    d.polygon(
        [(290, 460), (555, 440), (620, 630), (535, 605), (525, 510), (335, 525), (315, 650), (235, 620)],
        fill=(16, 16, 18, 228),
    )
    d.line((420, 475, 420, 690), fill=(210, 210, 214, 230), width=5)
    out = Image.alpha_composite(canvas, clothes)
    out.save(OUT)
    print(OUT, out.size)


if __name__ == "__main__":
    main()
