#!/usr/bin/env python3
"""Same cow, CORTIS 拖拉机舞 lean + steering wheel. Result card only."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

SRC = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/art/cow-tractor.png")


def main():
    raw = Image.open(SRC).convert("RGBA")
    w, h = raw.size
    cow = raw.crop((20, 140, w - 20, h - 30))
    cow = cow.rotate(-16, resample=Image.Resampling.BICUBIC, expand=True)
    # hip pop: slight extra rotate of lower half is too messy; lean is enough
    canvas = Image.new("RGBA", (cow.width + 80, cow.height + 40), (0, 0, 0, 0))
    canvas.alpha_composite(cow, (40, 10))
    d = ImageDraw.Draw(canvas)
    cw, ch = canvas.size
    # invisible tractor wheel in front of chest
    cx, cy = int(cw * 0.50), int(ch * 0.62)
    r = int(min(cw, ch) * 0.09)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(28, 24, 20, 230), width=10)
    d.ellipse((cx - r + 16, cy - r + 16, cx + r - 16, cy + r - 16), outline=(28, 24, 20, 180), width=4)
    d.line((cx - r + 8, cy, cx + r - 8, cy), fill=(28, 24, 20, 200), width=5)
    d.line((cx, cy - r + 8, cx, cy + r - 8), fill=(28, 24, 20, 200), width=5)
    canvas.filter(ImageFilter.SMOOTH)
    canvas.save(OUT)
    print(OUT, canvas.size)


if __name__ == "__main__":
    main()
