#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/art/cow-tractor.png")


def main():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    ink = (16, 16, 18, 235)
    stripe = (240, 240, 242, 230)
    # hoodie body
    d.rounded_rectangle((int(w * 0.34), int(h * 0.36), int(w * 0.66), int(h * 0.60)), 28, fill=ink)
    # zipper
    d.line((w * 0.50, h * 0.38, w * 0.50, h * 0.58), fill=stripe, width=max(3, w // 220))
    # sleeves
    d.polygon(
        [
            (w * 0.34, h * 0.40),
            (w * 0.22, h * 0.52),
            (w * 0.18, h * 0.60),
            (w * 0.26, h * 0.62),
            (w * 0.36, h * 0.50),
        ],
        fill=ink,
    )
    d.polygon(
        [
            (w * 0.66, h * 0.40),
            (w * 0.78, h * 0.52),
            (w * 0.82, h * 0.60),
            (w * 0.74, h * 0.62),
            (w * 0.64, h * 0.50),
        ],
        fill=ink,
    )
    # pants
    d.polygon(
        [
            (w * 0.36, h * 0.58),
            (w * 0.64, h * 0.58),
            (w * 0.62, h * 0.86),
            (w * 0.54, h * 0.86),
            (w * 0.50, h * 0.64),
            (w * 0.46, h * 0.86),
            (w * 0.38, h * 0.86),
        ],
        fill=ink,
    )
    # side stripes
    d.line((w * 0.40, h * 0.60, w * 0.41, h * 0.84), fill=stripe, width=max(4, w // 180))
    d.line((w * 0.60, h * 0.60, w * 0.59, h * 0.84), fill=stripe, width=max(4, w // 180))
    # hood shadow under chin
    d.ellipse((w * 0.40, h * 0.33, w * 0.60, h * 0.40), outline=ink, width=max(8, w // 90))
    out = Image.alpha_composite(im, layer)
    out.save(OUT)
    print(OUT)


if __name__ == "__main__":
    main()
