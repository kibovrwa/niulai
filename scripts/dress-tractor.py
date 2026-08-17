#!/usr/bin/env python3
"""拖拉机牛 result: same cow head on the CORTIS tractor-dance body."""
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter

POSE = Path("/workspace/attachments/IMG_8081.jpg")
COW = Path("/workspace/public/art/totem-god.jpg")
OUT = Path("/workspace/public/art/cow-tractor.png")


def main():
    pose = Image.open(POSE).convert("RGBA")
    # tighten on the dancer
    pw, ph = pose.size
    pose = pose.crop((int(pw * 0.02), int(ph * 0.02), int(pw * 0.78), int(ph * 0.98)))
    pose = ImageEnhance.Color(pose).enhance(0.92)
    pose = ImageEnhance.Contrast(pose).enhance(1.08)

    cow = Image.open(COW).convert("RGBA")
    cw, ch = cow.size
    head = cow.crop((90, 40, cw - 90, int(ch * 0.48)))
    # scale head to cover the human face
    target_w = int(pose.width * 0.44)
    ratio = target_w / head.width
    head = head.resize((target_w, int(head.height * ratio)), Image.Resampling.LANCZOS)

    # soft edge
    mask = Image.new("L", head.size, 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((4, 4, head.width - 4, int(head.height * 0.92)), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(8))
    head.putalpha(ImageChops.multiply(head.split()[-1], mask))

    canvas = pose.copy()
    hx = int(pose.width * 0.18)
    hy = int(pose.height * -0.01)
    canvas.alpha_composite(head, (hx, hy))

    # cream wash so it sits on the paper card
    wash = Image.new("RGBA", canvas.size, (255, 244, 214, 40))
    canvas = Image.alpha_composite(canvas, wash)
    canvas.save(OUT)
    print(OUT, canvas.size)


if __name__ == "__main__":
    main()
