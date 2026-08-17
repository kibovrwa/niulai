#!/usr/bin/env python3
"""拖拉机牛: the 牛来 cow only, CORTIS jacket + striped polo, dance lean."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/art/cow-tractor.png")


def main():
    raw = Image.open(SRC).convert("RGBA")
    w, h = raw.size
    cow = raw.crop((10, 120, w - 10, h - 20))
    cow = ImageEnhance.Contrast(cow).enhance(1.08)
    # dance lean
    cow = cow.rotate(-18, resample=Image.Resampling.BICUBIC, expand=True)
    cw, ch = cow.size
    layer = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # striped polo
    x0, y0, x1, y1 = int(cw * 0.34), int(ch * 0.38), int(cw * 0.66), int(ch * 0.58)
    d.rounded_rectangle((x0, y0, x1, y1), 22, fill=(48, 52, 58, 235))
    for i, col in enumerate(((190, 40, 40, 230), (210, 210, 214, 230), (190, 40, 40, 230), (80, 84, 90, 230))):
        yy = y0 + 18 + i * 16
        d.rectangle((x0 + 18, yy, x1 - 18, yy + 10), fill=col)
    # dark jacket over shoulders
    d.polygon(
        [
            (cw * 0.30, ch * 0.36),
            (cw * 0.70, ch * 0.36),
            (cw * 0.78, ch * 0.58),
            (cw * 0.68, ch * 0.60),
            (cw * 0.66, ch * 0.44),
            (cw * 0.34, ch * 0.44),
            (cw * 0.32, ch * 0.60),
            (cw * 0.22, ch * 0.58),
        ],
        fill=(18, 18, 20, 230),
    )
    # zipper
    d.line((cw * 0.50, ch * 0.38, cw * 0.50, ch * 0.56), fill=(200, 200, 204, 230), width=4)
    out = Image.alpha_composite(cow, layer)
    out.save(OUT)
    print(OUT, out.size)


if __name__ == "__main__":
    main()
